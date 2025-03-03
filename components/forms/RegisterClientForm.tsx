"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

export default function RegisterClientForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    user_type: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    user_type: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "first_name":
      case "last_name":
        if (value.length < 2) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Must be at least 2 characters",
          }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must be at least 8 characters",
          }));
        } else if (!/[A-Z]/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must contain at least one uppercase letter",
          }));
        } else if (!/[0-9]/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must contain at least one number",
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = document.getElementById("password") as HTMLInputElement;
    if (e.target.value !== password.value) {
      setErrors((prev) => ({ ...prev, re_password: "Passwords do not match" }));
    } else {
      setErrors((prev) => ({ ...prev, re_password: "" }));
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first_name">First name</Label>
          <Input
            id="first_name"
            name="first_name"
            placeholder=""
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.first_name && (
            <span className="text-red-500 text-sm">{errors.first_name}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last_name">Last name</Label>
          <Input
            id="last_name"
            name="last_name"
            placeholder=""
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.last_name && (
            <span className="text-red-500 text-sm">{errors.last_name}</span>
          )}
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
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="focus-visible:ring-[#344E41] focus:border-0 pr-10"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="re_password">Repeat Password</Label>
        <div className="relative">
          <Input
            id="re_password"
            name="re_password"
            type={showConfirmPassword ? "text" : "password"}
            className="focus-visible:ring-[#344E41] focus:border-0 pr-10"
            onChange={handlePasswordConfirm}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.re_password && (
          <span className="text-red-500 text-sm">{errors.re_password}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="userType">Where Do You Fit</Label>
        <Select
          name="user_type"
          required
          onValueChange={(value) => {
            setFormData((prev) => ({ ...prev, user_type: value }));
            if (!value) {
              setErrors((prev) => ({
                ...prev,
                user_type: "Please select an option",
              }));
            } else {
              setErrors((prev) => ({ ...prev, user_type: "" }));
            }
          }}
        >
          <SelectTrigger className="w-fullfocus:ring-2 focus:ring-[#344E41] focus-visible:ring-2 focus-visible:ring-[#344E41] focus:outline-none border-input">
            <SelectValue placeholder="Please Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="landlord">Landlord</SelectItem>
              {/* <SelectItem value="tenant">Tenant</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.user_type && (
          <span className="text-red-500 text-sm">{errors.user_type}</span>
        )}
      </div>
    </div>
  );
}
