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
import Link from "next/link";

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
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    deposit: "",
    type: "",
    location: "",
    image_files: "",
    pet_deposit: "",
  });
  const addProperty = usePropertiesStore((state) => state.addProperty);

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case "title":
        if (value.toString().length < 5) {
          setErrors((prev) => ({
            ...prev,
            title: "Title must be at least 5 characters",
          }));
          return false;
        }
        break;

      case "description":
        if (value.toString().length < 20) {
          setErrors((prev) => ({
            ...prev,
            description: "Description must be at least 20 characters",
          }));
          return false;
        }
        break;

      case "price":
      case "deposit":
        if (Number(value) <= 0) {
          setErrors((prev) => ({
            ...prev,
            [name]: `${
              name.charAt(0).toUpperCase() + name.slice(1)
            } must be greater than 0`,
          }));
          return false;
        }
        break;

      case "bedrooms":
      case "bathrooms":
      case "area":
        if (Number(value) <= 0) {
          setErrors((prev) => ({
            ...prev,
            [name]: `${
              name.charAt(0).toUpperCase() + name.slice(1)
            } must be greater than 0`,
          }));
          return false;
        }
        break;

      case "type":
      case "location":
        if (!value) {
          setErrors((prev) => ({ ...prev, [name]: `Please select a ${name}` }));
          return false;
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validate all fields
    let isValid = true;
    const fields = [
      "title",
      "description",
      "address",
      "price",
      "bedrooms",
      "bathrooms",
      "area",
      "deposit",
      "type",
      "location",
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (!validateField(field, value as string)) {
        isValid = false;
      }
    });

    if (images.length === 0) {
      setErrors((prev) => ({
        ...prev,
        image_files: "Please upload at least one image",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Convert type and location back to numbers
    formData.set("type", selectedType ? parseInt(selectedType).toString() : "");
    formData.set(
      "location",
      selectedLocation ? parseInt(selectedLocation).toString() : ""
    );

    // Remove any existing image_files entries
    formData.delete("image_files");

    // Append each image file to formData
    images.forEach((image) => {
      formData.append("image_files", image);
    });

    const result = await submitNewPropertyForm(formData);
    if (result.success) {
      alert(result.message);
      if (result.property) {
        addProperty(result.property);
      }
      setImages([]);
      setPreviewUrls([]);
      setSelectedType("");
      setSelectedLocation("");
      formRef.current?.reset();
    } else {
      alert(result.message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages(fileList);
      setErrors((prev) => ({ ...prev, image_files: "" }));

      // Create preview URLs
      const urls = fileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);

    // Remove the image and its preview
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setImages(newImages);
    setPreviewUrls(newPreviewUrls);

    // Show error if no images left
    if (newImages.length === 0) {
      setErrors((prev) => ({
        ...prev,
        image_files: "Please upload at least one image",
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateField(e.target.name, e.target.value);
  };

  React.useEffect(() => {
    // Cleanup preview URLs when component unmounts
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <form
      ref={formRef}
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
          onChange={handleInputChange}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="focus-visible:ring-[#344E41] focus:border-0"
          onChange={handleInputChange}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
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
            onChange={handleInputChange}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
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
            onChange={handleInputChange}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
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
            onChange={handleInputChange}
          />
          {errors.bedrooms && (
            <span className="text-red-500 text-sm">{errors.bedrooms}</span>
          )}
        </div>
        <div className="m-1">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            required
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.bathrooms && (
            <span className="text-red-500 text-sm">{errors.bathrooms}</span>
          )}
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
        {/* <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_smokers"
            name="accepts_smokers"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_smokers">Accepts Smokers</Label>
        </div> */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_in_app_payment"
            name="accepts_in_app_payment"
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_in_app_payment">Payment Via App</Label>
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
            onChange={handleInputChange}
          />
          {errors.area && (
            <span className="text-red-500 text-sm">{errors.area}</span>
          )}
        </div>
        <div className="m-1">
          <Label htmlFor="pet_deposit">Pet Deposit</Label>
          <Input
            id="pet_deposit"
            name="pet_deposit"
            type="number"
            step="0.01"
            className="focus-visible:ring-[#344E41] focus:border-0"
            onChange={handleInputChange}
          />
          {errors.pet_deposit && (
            <span className="text-red-500 text-sm">{errors.pet_deposit}</span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select
          name="type"
          value={selectedType}
          onValueChange={(value) => {
            setSelectedType(value);
            validateField("type", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose">
              {selectedType &&
                houseTypes.find((type) => type.id.toString() === selectedType)
                  ?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {houseTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.type && (
          <span className="text-red-500 text-sm">{errors.type}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Select
          name="location"
          value={selectedLocation}
          onValueChange={(value) => {
            setSelectedLocation(value);
            validateField("location", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose">
              {selectedLocation &&
                houseLocations.find(
                  (loc) => loc.id.toString() === selectedLocation
                )?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {houseLocations?.map((location) => (
                <SelectItem key={location.id} value={location.id.toString()}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.location && (
          <span className="text-red-500 text-sm">{errors.location}</span>
        )}
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
          onChange={handleInputChange}
        />
        {errors.deposit && (
          <span className="text-red-500 text-sm">{errors.deposit}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image_files">Property Images</Label>
        <Link
          href="/image-upload-tips"
          className="text-sm text-[#344E41] hover:text-[#A3B18A]"
        >
          Learn more about capturing the best images
        </Link>
        <Input
          id="image_files"
          name="image_files"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
        {errors.image_files && (
          <span className="text-red-500 text-sm">{errors.image_files}</span>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
        Submit
      </Button>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Disclaimer:</span>
          <br />
          Landlords who are not the legal owners of the property must provide a
          signed affidavit from the rightful owner, granting explicit
          authorization to list and upload images of the property on Ro-ja for
          rental purposes.
          <br />
          <br />
          Failure to provide such documentation will result in the removal of
          the listing and may be subject to further review to ensure compliance
          with property listing standards and legal requirements.
        </p>
      </div>
    </form>
  );
}
