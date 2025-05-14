import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="payment-checkmark-circle">
          <div className="payment-checkmark" />
        </div>
        <h2 className="payment-success-title">Payment Successful</h2>
        <p className="payment-success-message">Thank you for your purchase!</p>
        <Link to="/" className="payment-success-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
