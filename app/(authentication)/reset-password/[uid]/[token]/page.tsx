"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  const router = useRouter();
  const { uid, token } = params;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const new_password = formData.get("new_password") as string;
    const re_new_password = formData.get("re_new_password") as string;

    formData.append("new_password", new_password);
    formData.append("re_new_password", re_new_password);
    formData.append("uid", uid);
    formData.append("token", token);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow" as const,
    };

    const res = await fetch(
      "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
      requestOptions
    );
    // const data = await res.json();
    // console.log(data);

    if (res.status === 204) {
      alert("Password reset successfully");
      router.push("/auth/login");
    } else {
      alert("Failed to send email");
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
          <CardTitle className="mt-4">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              name="new_password"
              placeholder="Enter your new password"
              className="mb-4"
            />
            <Input
              type="password"
              name="re_new_password"
              placeholder="Enter your new password again"
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

export default ResetPasswordPage;
