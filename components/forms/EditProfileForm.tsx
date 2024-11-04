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

export default function EditTenantProfileForm({
  className,
  data,
}: EditProfileFormProps) {
  const [errors, setErrors] = React.useState({
    date_of_birth: "",
    phone: "",
    alternate_phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    id_number: "",
    marital_status: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "date_of_birth":
        if (!value) {
          setErrors(prev => ({ ...prev, date_of_birth: "Date of birth is required" }));
          return false;
        }
        const date = new Date(value);
        const today = new Date();
        if (date > today) {
          setErrors(prev => ({ ...prev, date_of_birth: "Date cannot be in the future" }));
          return false;
        }
        break;

      case "phone":
      case "alternate_phone":
      case "emergency_contact_phone":
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (value && !phoneRegex.test(value)) {
          setErrors(prev => ({ ...prev, [name]: "Please enter a valid phone number" }));
          return false;
        }
        break;

      case "emergency_contact_name":
        if (value && value.length < 2) {
          setErrors(prev => ({ ...prev, emergency_contact_name: "Name must be at least 2 characters" }));
          return false;
        }
        break;

      case "id_number":
        const idRegex = /^[A-Za-z0-9]{5,}$/;
        if (value && !idRegex.test(value)) {
          setErrors(prev => ({ ...prev, id_number: "Please enter a valid ID number" }));
          return false;
        }
        break;
    }
    setErrors(prev => ({ ...prev, [name]: "" }));
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Validate all fields
    let isValid = true;
    const fields = [
      "date_of_birth",
      "phone",
      "alternate_phone",
      "emergency_contact_name",
      "emergency_contact_phone",
      "id_number",
    ];

    fields.forEach(field => {
      const value = formData.get(field) as string;
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    const result = await submitEditProfileFormAction(formData);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  return (
    <form
      className={cn("grid items-center gap-4 w-[90%] ml-4", className)}
      onSubmit={handleSubmit}
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
          className="focus-visible:ring-[#344E41] focus:border-0"
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
          <span className="text-red-500 text-sm">{errors.emergency_contact_name}</span>
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
          <span className="text-red-500 text-sm">{errors.emergency_contact_phone}</span>
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
