"use client"; // Necessary in Next.js 13+ when using client-side features

import { useState } from "react";
import PaymentStatus from "@/components/PaymentStatus";
function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: "",
    phone: "",
    email: "",
  });
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [pollUrl, setPollUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/initiate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setInstructions(data.instructions);
        setPollUrl(data.poll_url); // Save poll URL for status checks
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={initiatePayment}>
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {instructions && <div className="instructions">{instructions}</div>}
      {error && <div className="error">{error}</div>}
      {pollUrl && <PaymentStatus pollUrl={pollUrl} />}
    </div>
  );
}

export default PaymentForm;
