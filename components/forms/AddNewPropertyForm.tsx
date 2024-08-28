"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { submitNewPropertyForm } from "@/lib/submitNewPropertyFormAction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddNewPropertyForm({
  className,
  houseTypes,
  houseLocations,
}: React.ComponentProps<"form">) {
  const [images, setImages] = React.useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Append each image file to formData
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    console.log("Images", images);
    console.log("Formdata", formData);

    const result = await submitNewPropertyForm(formData);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  return (
    <form
      className={cn("grid items-start ml-3 gap-4 w-[95%]", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type="text" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="flex justify-between">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" type="text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" required />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid gap-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" required />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="is_available" name="is_available" />
          <Label htmlFor="is_available">Is Available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="accepts_pets" name="accepts_pets" />
          <Label htmlFor="accepts_pets">Accepts Pets</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="accepts_smokers" name="accepts_smokers" />
          <Label htmlFor="accepts_smokers">Accepts Smokers</Label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid gap-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input id="area" name="area" type="number" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pet_deposit">Pet Deposit</Label>
          <Input
            id="pet_deposit"
            name="pet_deposit"
            type="number"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select name="type">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {houseTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Select name="location">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {houseLocations?.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="deposit">Deposit</Label>
        <Input id="deposit" name="deposit" type="number" step="0.01" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="images">Property Images</Label>
        <Input
          id="images"
          name="images"
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
