"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  params: {
    id: string;
  };
}

const ApprovePage = ({ params }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const approveProperty = async () => {
      const { id } = params;

      console.log("ID:", id);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include" as RequestCredentials, // Type assertion to RequestCredentials
        body: new URLSearchParams({ id: id }),
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}/approve/`,
          options
        );

        if (res.status === 200) {
          toast.success("Property approved successfully.", {
            description: "",
            duration: 5000,
            position: "top-right",
          });

          router.push("/properties");
        } else {
          const data = await res.json();
          console.error("Approval failed:", data);
          // alert("Account activation failed. Please try again.");
        }
      } catch (error) {
        console.error("Activation request error:", error);
        // alert("An error occurred during account activation.");
        toast.success("An error occurred during property approval.", {
          description: "Please try again or contact support",
          duration: 5000,
          position: "top-right",
        });
      }
    };

    // alert("Approving property...");
    // alert(params.id);

    approveProperty();
  }, [params, router]);

  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <Image src="/img/RO-JA.svg" alt="logo" width="650" height="250" />
      <h1 className="text-2xl font-bold mt-5 text-center">
        Property Is Being Approved Now.....
      </h1>
    </div>
  );
};

export default ApprovePage;
