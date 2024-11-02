import React from "react";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginClientForm from "./LoginClientForm";

export const LoginForm = async ({
  searchParams,
}: {
  searchParams?: { error?: string };
}) => {
  const error = searchParams?.error;

  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await login(formData);
    if (result.success) {
      redirect("/");
    } else {
      return redirect(
        `/auth/login?error=${encodeURIComponent(
          result.data.detail || "An error occurred"
        )}`
      );
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="text-[#344E41] mb-4 text-sm">
            {decodeURIComponent(error)}
          </p>
        )}
        <form action={handleSubmit} className="my-8">
          <div className="grid gap-4">
            <LoginClientForm />
            <Button
              type="submit"
              className="w-full bg-[#344E41] hover:bg-[#A3B18A]"
              id="submit-button"
            >
              Login
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="underline text-[#344E41] font-bold"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
