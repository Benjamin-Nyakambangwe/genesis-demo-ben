"use client";

import { useState, useEffect } from "react";

function PaymentStatus({ pollUrl }) {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKED_URL}/auth/status/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ poll_url: pollUrl }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setStatus(data.status);
            if (data.status === "Paid" || data.status === "Cancelled") {
              clearInterval(interval);
            }
          }
        } else {
          console.error("Error fetching payment status:", response.statusText);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }, 30000); // Poll every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
  // }, [pollUrl]);

  return <div>Payment Status: {status}</div>;
}

export default PaymentStatus;
