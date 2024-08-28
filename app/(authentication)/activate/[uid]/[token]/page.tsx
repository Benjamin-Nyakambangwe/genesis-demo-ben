"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

const ActivatePage = ({ params }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const activateAccount = async () => {
      const { uid, token } = params;
      const decodedToken = decodeURIComponent(token);

      console.log("UID:", uid);
      console.log("Decoded Token:", decodedToken);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add CSRF token header if required
          // "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include", // This will include cookies in the request
        body: new URLSearchParams({ uid: uid, token: decodedToken }),
      };

      try {
        const res = await fetch(
          "http://127.0.0.1:8000/auth/users/activation/",
          options
        );

        if (res.status === 204) {
          alert("Account activated successfully. You can now login.");
          router.push("/auth/login");
        } else {
          const data = await res.json();
          console.error("Activation failed:", data);
          alert("Account activation failed. Please try again.");
        }
      } catch (error) {
        console.error("Activation request error:", error);
        alert("An error occurred during account activation.");
      }
    };

    activateAccount();
  }, [params, router]);

  return <div>Account Activation in Progress...</div>;
};

export default ActivatePage;
