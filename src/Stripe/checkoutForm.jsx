import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

export const CheckoutForm = () => {
  const { innerHeight: height } = window;
  const stripe = useStripe();
  const elements = useElements();
  const [email, setemail] = useState("");

  let [loading, setLoading] = useState(false);
  const handleSubscription = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const response = await axios.post(
          "http://localhost:8080/stripe/subscribe",
          {
            email: email,
            payment_method: paymentMethod.id,
          }
        );
        if (response.data.success) {
          toast.success("Subscription Successful");
        } else {
          toast.error("Subscription Failed");
        }
      } catch (err) {
        toast.error(err?.message || "Subscription Failed");
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: 999,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <LoadingOverlay active={loading} spinner>
      <form
        onSubmit={handleSubscription}
        style={{ maxWidth: 400, margin: "0px auto", height: height }}
        className="pt-4"
      >
        <input
          type="text"
          className="form-control mb-4"
          value={email}
          placeholder="email"
          onChange={(evnt) => setemail(evnt.target.value)}
        />
        <CardElement hidePostalCode={true} />
        <button className="btn btn-success w-100 mt-4">Subscribe</button>
      </form>
    </LoadingOverlay>
  );
};
