// utils/saveOrder.js
import axios from "axios";

export const saveOrderToBackend = async ({
  cartItems,
  amount,
  userAddress,
  paymentIntent,
  userToken
}) => {
  try {
    if (!cartItems || cartItems.length === 0) {
      console.error("Cannot save order: cart is empty");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders/createorder`,
      {
        products: (cartItems || []).map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
        }))
        ,
        totalAmount: amount,
        shippingAddress: userAddress,
        paymentIntentId: paymentIntent.id,
        status: "paid",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(" Order saved:", response.data);
    return response.data;

  } catch (error) {
    console.error("Failed to save order:", error.response?.data || error.message);
    throw error;
  }
};
