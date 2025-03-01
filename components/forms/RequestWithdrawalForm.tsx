"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitWithdrawalRequest } from "@/lib/submitWithdrawalRequest";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function RequestWithdrawalForm({
  className,
  onSuccess,
}: React.ComponentProps<"form"> & {
  onSuccess?: () => void;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [errors, setErrors] = React.useState({
    amount: "",
    payment_method: "",
    bank_name: "",
    account_number: "",
    account_name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case "amount":
        if (Number(value) <= 0) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be greater than 0",
          }));
          return false;
        }
        break;

      case "payment_method":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            payment_method: "Please select a payment method",
          }));
          return false;
        }
        break;

      case "bank_name":
        if (selectedPaymentMethod === "Bank Transfer" && !value) {
          setErrors((prev) => ({
            ...prev,
            bank_name: "Bank name is required for bank transfers",
          }));
          return false;
        }
        break;

      case "account_number":
        if (selectedPaymentMethod === "Bank Transfer" && !value) {
          setErrors((prev) => ({
            ...prev,
            account_number: "Account number is required for bank transfers",
          }));
          return false;
        }
        break;

      case "account_name":
        if (selectedPaymentMethod === "Bank Transfer" && !value) {
          setErrors((prev) => ({
            ...prev,
            account_name: "Account name is required for bank transfers",
          }));
          return false;
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    // Validate all fields
    let isValid = true;
    const fields = ["amount", "payment_method"];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (!validateField(field, value as string)) {
        isValid = false;
      }
    });

    // Validate bank fields if payment method is Bank Transfer
    if (selectedPaymentMethod === "Bank Transfer") {
      const bankFields = ["bank_name", "account_number", "account_name"];
      bankFields.forEach((field) => {
        const value = formData.get(field);
        if (!validateField(field, value as string)) {
          isValid = false;
        }
      });
    }

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const result = await submitWithdrawalRequest(formData);
    if (result.success) {
      alert(result.message);
      formRef.current?.reset();
      setSelectedPaymentMethod("");
      if (onSuccess) {
        onSuccess();
      }
    } else {
      alert(result.message);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateField(e.target.name, e.target.value);
  };

  const paymentMethods = ["Bank Transfer", "Mobile Money"]; // TODO: Add PayPal and Other

  return (
    <form
      ref={formRef}
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          required
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
        />
        {errors.amount && (
          <span className="text-red-500 text-sm">{errors.amount}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="payment_method">Payment Method</Label>
        <Select
          name="payment_method"
          value={selectedPaymentMethod}
          onValueChange={(value) => {
            setSelectedPaymentMethod(value);
            validateField("payment_method", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {paymentMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.payment_method && (
          <span className="text-red-500 text-sm">{errors.payment_method}</span>
        )}
      </div>

      {/* {selectedPaymentMethod === "Bank Transfer" && ( */}
      <>
        <div className="grid gap-2">
          <Label htmlFor="bank_name">Bank Name</Label>
          <Input
            id="bank_name"
            name="bank_name"
            type="text"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.bank_name && (
            <span className="text-red-500 text-sm">{errors.bank_name}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="account_number">Account Number</Label>
          <Input
            id="account_number"
            name="account_number"
            type="text"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.account_number && (
            <span className="text-red-500 text-sm">
              {errors.account_number}
            </span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="account_name">Account Name</Label>
          <Input
            id="account_name"
            name="account_name"
            type="text"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.account_name && (
            <span className="text-red-500 text-sm">{errors.account_name}</span>
          )}
        </div>
      </>
      {/* )} */}

      <div className="grid gap-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any additional information about your withdrawal request"
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#344E41] hover:bg-[#A3B18A]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Request...
          </>
        ) : (
          "Request Withdrawal"
        )}
      </Button>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Note:</span>
          <br />
          Withdrawal requests are typically processed within 3-5 business days.
          The minimum withdrawal amount is $20. Please ensure all banking
          details are accurate as incorrect information may delay your
          withdrawal.
        </p>
      </div>
    </form>
  );
}
