import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import "./Stripe.css";
import { selectCurrOrder } from "../Order/OrderSlice";
import CheckoutForm from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QPejzC8qYSmHgYvsI3ZzBS8RDMpEYsSSUxlZFslB30pNjeHLi4Zq8fOPhSMfUZidifhOlcq5A6BfctimX9HJELz00bTQtlp6j");
export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/back/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta:{
        order_id: currentOrder.id 
        // this info will go to stripe => and then to our webhook
        // so we can conclude that payment was successful, even if client closes window after pay
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}