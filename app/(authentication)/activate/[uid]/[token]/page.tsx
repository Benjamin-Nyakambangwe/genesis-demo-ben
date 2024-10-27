"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users/activation/`,
          options
        );

        if (res.status === 204) {
          toast.success("Account activated successfully.", {
            description: "Please login to continue",
            duration: 5000,
            position: "top-right",
          });

          router.push("/auth/login");
        } else {
          const data = await res.json();
          console.error("Activation failed:", data);
          // alert("Account activation failed. Please try again.");
        }
      } catch (error) {
        console.error("Activation request error:", error);
        // alert("An error occurred during account activation.");
        toast.success("An error occurred during account activation.", {
          description: "Please try again or contact support",
          duration: 5000,
          position: "top-right",
        });
      }
    };

    activateAccount();
  }, [params, router]);

  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <Image src="/img/RO-JA.svg" alt="logo" width="650" height="250" />
      <h1 className="text-2xl font-bold mt-5 text-center">
        Your Account Is Being Activated Now.....
      </h1>
    </div>
  );
};

export default ActivatePage;
