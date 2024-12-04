"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    formData.append("email", email);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow" as const,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users/reset_password/`,
        requestOptions
      );

      if (res.status === 204) {
        toast.success("Email sent successfully", {
          description: "Please check your email for the reset password link",
          duration: 5000,
          position: "top-right",
        });
      } else {
        toast.error("Failed to send email", {
          description: "Something went wrong please try again",
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to send email", {
        description: "Something went wrong please try again",
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[650px]">
        <CardHeader className="text-center">
          <Image
            src="/img/RO-JA.svg"
            alt="logo"
            width={150}
            height={60}
            className="mx-auto"
          />
          <CardTitle className="mt-4">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mb-4"
              required
            />
            <Button
              type="submit"
              className="w-full mt-4 bg-[#344E41] hover:bg-[#A3B18A]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
