// "use client";
// import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { login, updateAccess, register } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import RegisterClientForm from "./RegisterClientForm";

export const RegisterForm = async ({
  searchParams,
}: {
  searchParams?: { email_error?: string };
}) => {
  const email_error = searchParams?.email_error;

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
            {email_error && (
              <div className=" text-red-700 py-3 rounded relative">
                {decodeURIComponent(email_error)}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="my-8"
            action={async (formData) => {
              "use server";

              const result = await register(formData);
              if (result.success) {
                redirect("/registration-success");
              } else {
                console.error("Registration error:", result.error);
                return redirect(
                  `/auth/register?email_error=${encodeURIComponent(
                    result.error.email[0]
                  )}`
                );
              }
            }}
          >
            <div className="grid gap-4">
              <RegisterClientForm />
              <ConsentCheckbox />
              <Button
                type="submit"
                className="w-full bg-[#344E41] hover:bg-[#A3B18A]"
                id="submit-button"
                disabled
              >
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="underline font-bold text-[#344E41] "
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
