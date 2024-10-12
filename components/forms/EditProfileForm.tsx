"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function EditTenantProfileForm({
  className,
  data,
}: React.ComponentProps<"form">) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await submitEditProfileFormAction(formData);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
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
          value={data.date_of_birth}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={data.phone}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="id_number">National ID</Label>
        <Input
          id="id_number"
          name="id_number"
          type="text"
          defaultValue={data.id_number}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="marital_status">Marital Status</Label>
        <Select name="marital_status" defaultValue={data.marital_status}>
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
        <Label htmlFor="alternate_phone">Alternate Phone Number</Label>
        <Input
          id="alternate_phone"
          name="alternate_phone"
          type="tel"
          defaultValue={data.alternate_phone}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
        <Input
          id="emergency_contact_name"
          name="emergency_contact_name"
          type="text"
          defaultValue={data.emergency_contact_name}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
        <Input
          id="emergency_contact_phone"
          name="emergency_contact_phone"
          type="tel"
          defaultValue={data.emergency_contact_phone}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>

      {/* <div className="grid gap-2">
        <Label htmlFor="num_of_vehicles">Number of Vehicles</Label>
        <Input id="num_of_vehicles" name="num_of_vehicles" type="number" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="criminal_record" name="criminal_record" />
        <Label htmlFor="criminal_record">Criminal Record</Label>
      </div> */}

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
