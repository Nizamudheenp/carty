import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveOrderToBackend } from "../utils/saveOrder";
import { showToast } from "../utils/toast";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, amount, cartItems, userToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!shippingAddress) {
      showToast('error','please provide a shipping address')
      return;
    }
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error", error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await saveOrderToBackend({
          cartItems,
          amount,
          userAddress: shippingAddress,
          paymentIntent,
          userToken,
        });
        navigate("/payment-success");
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/clearCart`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

      }
    } catch (error) {
      console.error("Error during payment or saving order:", error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "2rem",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          maxWidth: "800px",
          margin: "2rem auto",
        }}
      >
        <div style={{ flex: 1 }}>
          <h4>Select Payment Method</h4>
          <PaymentElement />
        </div>

        <div style={{ flex: 1 }}>
          <h3>Order Summary</h3>
          <p>Total Amount: <strong>₹{amount}</strong></p>
          <label>Shipping Address:</label>
          <textarea
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows="3"
            placeholder="Enter your address"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={!stripe || loading}
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              backgroundColor: "#6772e5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </form>
  );
};

const PaymentPage = ({ amount, cartItems, userToken }) => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/create-payment-intent`,
          { amount }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent", err);
      }
    };
    createIntent();
  }, [amount]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        cartItems={cartItems}
        userToken={userToken}
      />
    </Elements>
  ) : (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      Loading payment options...
    </div>
  );
};

export default PaymentPage;
