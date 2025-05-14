import React, { useState } from "react";
import PaymentPage from "./PaymentPage";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
const { amount, cartItems, token } = location.state || {};

  return (
    <div>
      <PaymentPage amount={amount} cartItems={cartItems} userToken={token} />
    </div>
  );
};

export default CheckoutPage;
