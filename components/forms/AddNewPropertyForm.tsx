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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertiesStore } from "@/store/properties";

export default function AddNewPropertyForm({
  className,
  houseTypes,
  houseLocations,
}: React.ComponentProps<"form"> & {
  houseTypes: { id: string; name: string }[];
  houseLocations: { id: string; name: string }[];
}) {
  const [images, setImages] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>("test");
  const [selectedLocation, setSelectedLocation] =
    React.useState<string>("test");
  const addProperty = usePropertiesStore((state) => state.addProperty);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Remove any existing image_files entries
    formData.delete("image_files");

    // Append each image file to formData with the correct field name
    images.forEach((image) => {
      formData.append("image_files", image);
    });

    const result = await submitNewPropertyForm(formData);
    if (result.success) {
      alert(result.message);
      // Add the new property to the store
      if (result.property) {
        addProperty(result.property);
      }
      // Reset form and images
      // event.currentTarget.reset();
      setImages([]);
      setPreviewUrls([]);
    } else {
      alert(result.message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages(fileList);

      // Create preview URLs
      const urls = fileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  React.useEffect(() => {
    // Cleanup preview URLs when component unmounts
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <form
      className={cn("grid items-start ml-2 gap-4 w-[95%]", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="flex justify-between">
        <div className="m-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
        <div className="m-1">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="m-1">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
        <div className="m-1">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_pets"
            name="accepts_pets"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_pets">Accepts Pets</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_smokers"
            name="accepts_smokers"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_smokers">Accepts Smokers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pool"
            name="pool"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="pool">Pool Available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="garden"
            name="garden"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="garden">Garden Available</Label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="m-1">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input
            id="area"
            name="area"
            type="number"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
        <div className="m-1">
          <Label htmlFor="pet_deposit">Pet Deposit</Label>
          <Input
            id="pet_deposit"
            name="pet_deposit"
            type="number"
            step="0.01"
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select name="type" onValueChange={setSelectedType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose">
              {
                houseTypes.find((type) => type.id === parseInt(selectedType))
                  ?.name
              }
              {/* {typeof selectedType} */}
            </SelectValue>
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
        <Select name="location" onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose">
              {
                houseLocations.find(
                  (type) => type.id === parseInt(selectedLocation)
                )?.name
              }
            </SelectValue>
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
        <Input
          id="deposit"
          name="deposit"
          type="number"
          step="0.01"
          required
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image_files">Property Images</Label>
        <Input
          id="image_files"
          name="image_files"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
        Submit
      </Button>
    </form>
  );
}
