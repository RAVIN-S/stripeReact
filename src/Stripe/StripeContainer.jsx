import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkoutForm";


const PUBLIC_KEY = "pk_test_51JZH3mSE6pWSV7cbvTMqFAKpmFkCfnmauTtnInBURVpUBvLafq99MnCvG27tQrd31cDa6owpy5YodCZ8yKs8rGQV00ibjROZVr";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;