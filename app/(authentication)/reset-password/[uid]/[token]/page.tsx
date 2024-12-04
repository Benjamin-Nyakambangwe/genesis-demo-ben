"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  const router = useRouter();
  const { uid, token } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    new_password: "",
    re_new_password: "",
  });

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        new_password: "Password must be at least 8 characters",
      }));
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        new_password: "Password must contain at least one uppercase letter",
      }));
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        new_password: "Password must contain at least one number",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, new_password: "" }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ new_password: "", re_new_password: "" });

    const formData = new FormData(e.currentTarget);
    const new_password = formData.get("new_password") as string;
    const re_new_password = formData.get("re_new_password") as string;

    // Validate password strength
    if (!validatePassword(new_password)) {
      return;
    }

    // Check if passwords match
    if (new_password !== re_new_password) {
      setErrors((prev) => ({
        ...prev,
        re_new_password: "Passwords do not match",
      }));
      return;
    }

    setIsSubmitting(true);

    // formData.append("new_password", new_password);
    // formData.append("re_new_password", re_new_password);
    // formData.append("uid", uid);
    // formData.append("token", token);

    console.log(formData);
    console.log(new_password);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow" as const,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users/reset_password_confirm/`,
        requestOptions
      );

      if (res.status === 204) {
        toast.success("Password reset successfully", {
          description: "You can now login with your new password",
          duration: 5000,
          position: "top-right",
        });
        router.push("/auth/login");
      } else {
        toast.error("Failed to reset password", {
          description: "Please try again or request a new reset link",
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to reset password", {
        description: "Something went wrong, please try again",
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
          <CardTitle className="mt-4">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Input
                type="password"
                name="new_password"
                placeholder="Enter your new password"
                className="mb-1"
                required
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm">{errors.new_password}</p>
              )}
            </div>

            <div className="space-y-1 mt-4">
              <Input
                type="password"
                name="re_new_password"
                placeholder="Enter your new password again"
                className="mb-1"
                required
              />
              {errors.re_new_password && (
                <p className="text-red-500 text-sm">{errors.re_new_password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-[#344E41] hover:bg-[#A3B18A]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
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

export default ResetPasswordPage;
