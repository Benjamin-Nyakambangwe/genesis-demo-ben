"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditProfileFormProps extends React.ComponentProps<"form"> {
  data: {
    date_of_birth: string | null;
    phone: string;
    alternate_phone: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    additional_notes: string;
    id_number: string;
    marital_status: string;
  };
}

interface FormErrors {
  [key: string]: string | undefined;
  phone?: string;
  date_of_birth?: string;
  id_number?: string;
}

export default function EditProfileForm({
  className,
  data,
}: EditProfileFormProps) {
  const [errors, setErrors] = React.useState<FormErrors>({});

  // Add log when component mounts
  React.useEffect(() => {
    console.log("EditProfileForm mounted");
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "date_of_birth":
        const dobDate = new Date(value);
        const todayDate = new Date();
        const userAge = todayDate.getFullYear() - dobDate.getFullYear();
        if (userAge < 18) {
          setErrors((prev) => ({
            ...prev,
            date_of_birth: "You must be at least 18 years old",
          }));
          return false;
        }
        break;

      case "phone":
      case "alternate_phone":
      case "emergency_contact_phone":
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (value && !phoneRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Please enter a valid phone number",
          }));
          return false;
        }
        break;

      case "emergency_contact_name":
        if (value && value.length < 2) {
          setErrors((prev) => ({
            ...prev,
            emergency_contact_name: "Name must be at least 2 characters",
          }));
          return false;
        }
        break;

      case "id_number":
        if (value && !/^\d{7,8}[A-Z]\d{2}$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            id_number: "Please enter a valid ID number (e.g., 12345678F55)",
          }));
          return false;
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const validateForm = (formData: FormData): boolean => {
    console.log("validateForm running", Object.fromEntries(formData));
    const newErrors: FormErrors = {};

    // Phone validation
    const phone = formData.get("phone") as string;
    if (phone && !phone.startsWith("+")) {
      newErrors.phone =
        "Please enter a valid phone number with country code (e.g., +263...)";
    }

    const idNumber = formData.get("id_number") as string;
    if (idNumber && !/^\d{7,8}[A-Z]\d{2}$/.test(idNumber)) {
      newErrors.id_number =
        "Please enter a valid ID number (e.g., 12345678F55)";
    }

    // Date of birth validation
    const dob = new Date(formData.get("date_of_birth") as string);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      newErrors.date_of_birth = "You must be at least 18 years old";
    }

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit triggered");
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log("Form data:", Object.fromEntries(formData));

    if (!validateForm(formData)) {
      console.log("Form validation failed");
      return;
    }

    try {
      console.log("Attempting to submit form data");
      const result = await submitEditProfileFormAction(formData);
      console.log("Submit result:", result);
      if (result.success) {
        // Show success message and refresh the page to show updated data
        alert(result.message);
        window.location.reload();
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Submit error:", error);
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateField(e.target.name, e.target.value);
  };

  return (
    <form
      className={cn("grid items-center gap-4 w-[90%] ml-4", className)}
      onSubmit={(e) => {
        console.log("Form onSubmit triggered");
        handleSubmit(e);
      }}
      method="POST"
    >
      <div className="grid gap-2">
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          defaultValue={data.date_of_birth || ""}
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
          required
        />
        {errors.date_of_birth && (
          <span className="text-red-500 text-sm">{errors.date_of_birth}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={data.phone}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.phone && "border-red-500"
          )}
          onChange={handleInputChange}
          required
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="id_number">National ID</Label>
        <Input
          id="id_number"
          name="id_number"
          type="text"
          defaultValue={data.id_number}
          onChange={handleInputChange}
          required
        />
        {errors.id_number && (
          <span className="text-red-500 text-sm">{errors.id_number}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="marital_status">Marital Status</Label>
        <Select
          name="marital_status"
          defaultValue={data.marital_status}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
          </SelectContent>
        </Select>
        {errors.marital_status && (
          <span className="text-red-500 text-sm">{errors.marital_status}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="alternate_phone">Alternate Phone Number</Label>
        <Input
          id="alternate_phone"
          name="alternate_phone"
          type="tel"
          defaultValue={data.alternate_phone}
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
        />
        {errors.alternate_phone && (
          <span className="text-red-500 text-sm">{errors.alternate_phone}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
        <Input
          id="emergency_contact_name"
          name="emergency_contact_name"
          type="text"
          defaultValue={data.emergency_contact_name}
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
          required
        />
        {errors.emergency_contact_name && (
          <span className="text-red-500 text-sm">
            {errors.emergency_contact_name}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
        <Input
          id="emergency_contact_phone"
          name="emergency_contact_phone"
          type="tel"
          defaultValue={data.emergency_contact_phone}
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
          required
        />
        {errors.emergency_contact_phone && (
          <span className="text-red-500 text-sm">
            {errors.emergency_contact_phone}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="additional_notes">Additional Notes</Label>
        <Textarea
          id="additional_notes"
          name="additional_notes"
          defaultValue={data.additional_notes}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>

      <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
        Submit
      </Button>
    </form>
  );
}
