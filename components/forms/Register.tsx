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

export function RegisterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
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
                // Handle login failure (e.g., show an error message)
                console.error(result.error);
              }
            }}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder=""
                    required
                    className="focus-visible:ring-red-600 focus:border-0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder=""
                    required
                    className="focus-visible:ring-red-600 focus:border-0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder=""
                  required
                  className="focus-visible:ring-red-600 focus:border-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="focus-visible:ring-red-600 focus:border-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="re_password">Repeat Password</Label>
                <Input
                  id="re_password"
                  name="re_password"
                  type="password"
                  className="focus-visible:ring-red-600 focus:border-0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userType">Where Do You Fit</Label>
                <Select name="user_type">
                  <SelectTrigger
                    className="w-fullfocus:ring-2 focus:ring-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus:outline-none border-input
"
                  >
                    <SelectValue placeholder="Please Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Where Do You Fit</SelectLabel> */}
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-red-600">
                Create an account
              </Button>
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="underline font-bold text-red-600"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
