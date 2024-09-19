"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    formData.append("email", email);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow" as const,
    };

    const res = await fetch(
      "http://127.0.0.1:8000/auth/users/reset_password/",
      requestOptions
    );
    // const data = await res.json();
    // console.log(data);

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
            />
            <Button type="submit" className="w-full mt-4 bg-red-600">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
