import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkoutForm";

const PUBLIC_KEY =
  "pk_test_51JZdcbGrZDmYTbYXlPEHVwQul2lDQDP0ze04wWejutkNsgsI12C1voL3tPE6Z2RtjiiKpsRp2Suu385vB0RgbVn000SoGGskIU";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
