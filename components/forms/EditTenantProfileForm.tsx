"use client";

import { useState } from "react";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";
import { useTenantDetailsStore } from "@/store/tenantDetails";
import { useDialogsState } from "@/store/dialogs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

interface FormErrors {
  [key: string]: string | undefined;
  phone?: string;
  work_phone?: string;
  emergency_contact_phone?: string;
  next_of_kin_phone?: string;
  email?: string;
  date_of_birth?: string;
  id_number?: string;
  max_rent?: string;
  number_of_occupants?: string;
  num_of_vehicles?: string;
}

const PhoneInput = ({
  id,
  name,
  defaultValue,
  error,
  label,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  error?: string;
  label: string;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={name}
      type="tel"
      placeholder="+263 71 234 5678"
      defaultValue={defaultValue}
      pattern="^\+[1-9]\d{1,14}$"
      className={cn(
        "focus-visible:ring-[#344E41] focus:border-0",
        error && "border-red-500"
      )}
    />
    {error && <span className="text-sm text-red-500">{error}</span>}
    <span className="text-xs text-gray-500">
      Format: +263 followed by phone number
    </span>
  </div>
);

export default function EditTenantProfileForm({
  initialData,
  className,
}: React.ComponentProps<"form"> & { initialData?: any }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateTenantDetails = useTenantDetailsStore(
    (state) => state.updateTenantDetails
  );
  const updateEditProfileDialogOpen = useDialogsState(
    (state) => state.updateEditProfileDialogOpen
  );

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};

    // Phone number validations
    const phoneFields = [
      "phone",
      "work_phone",
      "emergency_contact_phone",
      "next_of_kin_phone",
    ];
    phoneFields.forEach((field) => {
      const phone = formData.get(field) as string;
      if (phone && !isValidPhoneNumber(phone)) {
        newErrors[field] =
          "Please enter a valid phone number with country code (e.g., +263...)";
      }
    });

    // Date of birth validation
    const dob = new Date(formData.get("date_of_birth") as string);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      newErrors.date_of_birth = "You must be at least 18 years old";
    }

    // ID number validation
    const idNumber = formData.get("id_number") as string;
    if (idNumber && !/^\d{7,8}[A-Z]\d{2}$/.test(idNumber)) {
      newErrors.id_number =
        "Please enter a valid ID number (e.g., 12345678F55)";
    }

    // Numeric validations
    const maxRent = Number(formData.get("max_rent"));
    if (maxRent <= 0) {
      newErrors.max_rent = "Max rent must be greater than 0";
    }

    const occupants = Number(formData.get("number_of_occupants"));
    if (occupants <= 0 || !Number.isInteger(occupants)) {
      newErrors.number_of_occupants =
        "Number of occupants must be a positive whole number";
    }

    const vehicles = Number(formData.get("num_of_vehicles"));
    if (
      formData.get("has_vehicle") === "true" &&
      (vehicles <= 0 || !Number.isInteger(vehicles))
    ) {
      newErrors.num_of_vehicles =
        "Number of vehicles must be a positive whole number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const result = await submitEditTenantProfileFormAction(formData);

      if (result.success) {
        updateTenantDetails(result.data);
        toast.success("Profile updated successfully");
        updateEditProfileDialogOpen();
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          defaultValue={initialData?.date_of_birth}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.date_of_birth && "border-red-500"
          )}
        />
        {errors.date_of_birth && (
          <span className="text-sm text-red-500">{errors.date_of_birth}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <Select name="gender" defaultValue={initialData?.gender}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <PhoneInput
        id="phone"
        name="phone"
        label="Phone Number"
        defaultValue={initialData?.phone}
        error={errors.phone}
      />
      <div className="grid gap-2">
        <Label htmlFor="id_number">National ID</Label>
        <Input
          id="id_number"
          name="id_number"
          type="text"
          defaultValue={initialData?.id_number}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.id_number && "border-red-500"
          )}
        />
        {errors.id_number && (
          <span className="text-sm text-red-500">{errors.id_number}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="marital_status">Marital Status</Label>
        <Select
          name="marital_status"
          defaultValue={initialData?.marital_status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
        <Input
          id="emergency_contact_name"
          name="emergency_contact_name"
          type="text"
          defaultValue={initialData?.emergency_contact_name}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.emergency_contact_name && "border-red-500"
          )}
        />
        {errors.emergency_contact_name && (
          <span className="text-sm text-red-500">
            {errors.emergency_contact_name}
          </span>
        )}
      </div>
      <PhoneInput
        id="emergency_contact_phone"
        name="emergency_contact_phone"
        label="Emergency Contact Phone"
        defaultValue={initialData?.emergency_contact_phone}
        error={errors.emergency_contact_phone}
      />
      <div className="grid gap-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          name="occupation"
          type="text"
          defaultValue={initialData?.occupation}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.occupation && "border-red-500"
          )}
        />
        {errors.occupation && (
          <span className="text-sm text-red-500">{errors.occupation}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="employer">Employer</Label>
        <Input
          id="employer"
          name="employer"
          type="text"
          defaultValue={initialData?.employer}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.employer && "border-red-500"
          )}
        />
        {errors.employer && (
          <span className="text-sm text-red-500">{errors.employer}</span>
        )}
      </div>
      <PhoneInput
        id="work_phone"
        name="work_phone"
        label="Work Phone"
        defaultValue={initialData?.work_phone}
        error={errors.work_phone}
      />
      <div className="grid gap-2">
        <Label htmlFor="preferred_lease_term">
          Preferred Lease Term (months)
        </Label>
        <Input
          id="preferred_lease_term"
          name="preferred_lease_term"
          type="number"
          defaultValue={initialData?.preferred_lease_term}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.preferred_lease_term && "border-red-500"
          )}
        />
        {errors.preferred_lease_term && (
          <span className="text-sm text-red-500">
            {errors.preferred_lease_term}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="max_rent">Max Rent</Label>
        <Input
          id="max_rent"
          name="max_rent"
          type="number"
          step="0.01"
          defaultValue={initialData?.max_rent}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.max_rent && "border-red-500"
          )}
        />
        {errors.max_rent && (
          <span className="text-sm text-red-500">{errors.max_rent}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferred_move_in_date">Preferred Move-in Date</Label>
        <Input
          id="preferred_move_in_date"
          name="preferred_move_in_date"
          type="date"
          defaultValue={initialData?.preferred_move_in_date}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.preferred_move_in_date && "border-red-500"
          )}
        />
        {errors.preferred_move_in_date && (
          <span className="text-sm text-red-500">
            {errors.preferred_move_in_date}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferred_area">Preferred Area</Label>
        <Textarea
          id="preferred_area"
          name="preferred_area"
          defaultValue={initialData?.preferred_area}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.preferred_area && "border-red-500"
          )}
        />
        {errors.preferred_area && (
          <span className="text-sm text-red-500">{errors.preferred_area}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="number_of_occupants">Number of Occupants</Label>
        <Input
          id="number_of_occupants"
          name="number_of_occupants"
          type="number"
          defaultValue={initialData?.number_of_occupants}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.number_of_occupants && "border-red-500"
          )}
        />
        {errors.number_of_occupants && (
          <span className="text-sm text-red-500">
            {errors.number_of_occupants}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="pets"
          name="pets"
          defaultChecked={initialData?.pets}
          className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
        />
        <Label htmlFor="pets">Pets</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pet_details">Pet Details</Label>
        <Textarea
          id="pet_details"
          name="pet_details"
          defaultValue={initialData?.pet_details}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.pet_details && "border-red-500"
          )}
        />
        {errors.pet_details && (
          <span className="text-sm text-red-500">{errors.pet_details}</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="smoker"
          name="smoker"
          defaultChecked={initialData?.smoker}
          className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
        />
        <Label htmlFor="smoker">Smoker</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="has_vehicle"
          name="has_vehicle"
          defaultChecked={initialData?.has_vehicle}
          className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
        />
        <Label htmlFor="has_vehicle">Has Vehicle</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="num_of_vehicles">Number of Vehicles</Label>
        <Input
          id="num_of_vehicles"
          name="num_of_vehicles"
          type="number"
          defaultValue={initialData?.num_of_vehicles}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.num_of_vehicles && "border-red-500"
          )}
        />
        {errors.num_of_vehicles && (
          <span className="text-sm text-red-500">{errors.num_of_vehicles}</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="criminal_record"
          name="criminal_record"
          defaultChecked={initialData?.criminal_record}
          className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
        />
        <Label htmlFor="criminal_record">Criminal Record</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="next_of_kin_name">Next of Kin Name</Label>
        <Input
          id="next_of_kin_name"
          name="next_of_kin_name"
          type="text"
          defaultValue={initialData?.next_of_kin_name}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.next_of_kin_name && "border-red-500"
          )}
        />
        {errors.next_of_kin_name && (
          <span className="text-sm text-red-500">
            {errors.next_of_kin_name}
          </span>
        )}
      </div>
      <PhoneInput
        id="next_of_kin_phone"
        name="next_of_kin_phone"
        label="Next of Kin Phone"
        defaultValue={initialData?.next_of_kin_phone}
        error={errors.next_of_kin_phone}
      />
      <div className="grid gap-2">
        <Label htmlFor="next_of_kin_email">Next of Kin Email</Label>
        <Input
          id="next_of_kin_email"
          name="next_of_kin_email"
          type="email"
          defaultValue={initialData?.next_of_kin_email}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.next_of_kin_email && "border-red-500"
          )}
        />
        {errors.next_of_kin_email && (
          <span className="text-sm text-red-500">
            {errors.next_of_kin_email}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="next_of_kin_address">Next of Kin Address</Label>
        <Input
          id="next_of_kin_address"
          name="next_of_kin_address"
          type="text"
          defaultValue={initialData?.next_of_kin_address}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.next_of_kin_address && "border-red-500"
          )}
        />
        {errors.next_of_kin_address && (
          <span className="text-sm text-red-500">
            {errors.next_of_kin_address}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="next_of_kin_relation">Next of Kin Relation</Label>
        <Input
          id="next_of_kin_relation"
          name="next_of_kin_relation"
          type="text"
          defaultValue={initialData?.next_of_kin_relation}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.next_of_kin_relation && "border-red-500"
          )}
        />
        {errors.next_of_kin_relation && (
          <span className="text-sm text-red-500">
            {errors.next_of_kin_relation}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="additional_notes">Additional Notes</Label>
        <Textarea
          id="additional_notes"
          name="additional_notes"
          defaultValue={initialData?.additional_notes}
          className={cn(
            "focus-visible:ring-[#344E41] focus:border-0",
            errors.additional_notes && "border-red-500"
          )}
        />
        {errors.additional_notes && (
          <span className="text-sm text-red-500">
            {errors.additional_notes}
          </span>
        )}
      </div>
      <Button
        className="w-full bg-[#344E41] text-white hover:bg-[#A3B18A]"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
