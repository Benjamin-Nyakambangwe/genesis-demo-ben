"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";

export default function EditProfileForm({
  className,
}: React.ComponentProps<"form">) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await submitEditTenantProfileFormAction(formData);
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
        <Input id="date_of_birth" name="date_of_birth" type="date" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" name="gender" type="text" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
        <Input
          id="emergency_contact_name"
          name="emergency_contact_name"
          type="text"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
        <Input
          id="emergency_contact_phone"
          name="emergency_contact_phone"
          type="tel"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input id="occupation" name="occupation" type="text" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="employer">Employer</Label>
        <Input id="employer" name="employer" type="text" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="work_phone">Work Phone</Label>
        <Input id="work_phone" name="work_phone" type="tel" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferred_lease_term">
          Preferred Lease Term (months)
        </Label>
        <Input
          id="preferred_lease_term"
          name="preferred_lease_term"
          type="number"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="max_rent">Max Rent</Label>
        <Input id="max_rent" name="max_rent" type="number" step="0.01" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferred_move_in_date">Preferred Move-in Date</Label>
        <Input
          id="preferred_move_in_date"
          name="preferred_move_in_date"
          type="date"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferred_area">Preferred Area</Label>
        <Textarea
          id="preferred_area"
          name="preferred_area"
          placeholder="Comma-separated list of preferred areas"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="number_of_occupants">Number of Occupants</Label>
        <Input
          id="number_of_occupants"
          name="number_of_occupants"
          type="number"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="pets" name="pets" />
        <Label htmlFor="pets">Pets</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pet_details">Pet Details</Label>
        <Textarea id="pet_details" name="pet_details" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="smoker" name="smoker" />
        <Label htmlFor="smoker">Smoker</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="has_vehicle" name="has_vehicle" />
        <Label htmlFor="has_vehicle">Has Vehicle</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="num_of_vehicles">Number of Vehicles</Label>
        <Input id="num_of_vehicles" name="num_of_vehicles" type="number" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="criminal_record" name="criminal_record" />
        <Label htmlFor="criminal_record">Criminal Record</Label>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_1_name">
          Personal Reference 1 Name
        </Label>
        <Input
          id="personal_reference_1_name"
          name="personal_reference_1_name"
          type="text"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_1_phone">
          Personal Reference 1 Phone
        </Label>
        <Input
          id="personal_reference_1_phone"
          name="personal_reference_1_phone"
          type="tel"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_1_relation">
          Personal Reference 1 Relation
        </Label>
        <Input
          id="personal_reference_1_relation"
          name="personal_reference_1_relation"
          type="text"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_2_name">
          Personal Reference 2 Name
        </Label>
        <Input
          id="personal_reference_2_name"
          name="personal_reference_2_name"
          type="text"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_2_phone">
          Personal Reference 2 Phone
        </Label>
        <Input
          id="personal_reference_2_phone"
          name="personal_reference_2_phone"
          type="tel"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="personal_reference_2_relation">
          Personal Reference 2 Relation
        </Label>
        <Input
          id="personal_reference_2_relation"
          name="personal_reference_2_relation"
          type="text"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="additional_notes">Additional Notes</Label>
        <Textarea id="additional_notes" name="additional_notes" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
