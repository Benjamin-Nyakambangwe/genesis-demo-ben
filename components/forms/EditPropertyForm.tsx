"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { submitEditPropertyForm } from "@/lib/submitEditPropertyFormAction";
import { useDialogsState } from "@/store/dialogs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Loader2 } from "lucide-react"; // Import the X icon for remove button
import { useFormStatus } from "react-dom";

export default function EditPropertyForm({
  className,
  houseTypes,
  houseLocations,
}: React.ComponentProps<"form"> & {
  houseTypes: { id: string; name: string }[];
  houseLocations: { id: string; name: string }[];
}) {
  const propertyToEdit = useDialogsState((state) => state.propertyToEdit);
  console.log("Property to edit in form:", propertyToEdit);
  const [images, setImages] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>(
    propertyToEdit?.images.map((img) => img.image) || []
  );
  const [removedImages, setRemovedImages] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>(
    propertyToEdit?.type?.id.toString() || ""
  );
  const [selectedLocation, setSelectedLocation] = React.useState<string>(
    propertyToEdit?.location?.id.toString() || ""
  );

  const { pending } = useFormStatus();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Remove any existing image_files entries
    formData.delete("image_files");

    // Append each new image file to formData
    images.forEach((image) => {
      formData.append("image_files", image);
    });

    // Add the property ID to the form data
    formData.append("id", propertyToEdit.id);

    // Add the list of removed images
    formData.append("removed_images", JSON.stringify(removedImages));

    const result = await submitEditPropertyForm(formData);
    if (result.success) {
      alert(result.message);
      // Reset form and images
      setImages([]);
      setPreviewUrls(propertyToEdit?.images.map((img) => img.image) || []);
      setRemovedImages([]);
    } else {
      alert(result.message);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...fileList]);

      // Create preview URLs for new images
      const urls = fileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  const removeImage = (index: number) => {
    const removedUrl = previewUrls[index];
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));

    if (removedUrl.startsWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)) {
      setRemovedImages((prevRemoved) => [...prevRemoved, removedUrl]);
    } else {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      URL.revokeObjectURL(removedUrl);
    }
  };

  React.useEffect(() => {
    // Cleanup preview URLs when component unmounts
    return () => {
      previewUrls.forEach((url) => {
        if (!url.startsWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)) {
          URL.revokeObjectURL(url);
        }
      });
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
          defaultValue={propertyToEdit?.title}
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={propertyToEdit?.description}
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
            defaultValue={propertyToEdit?.address}
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
            defaultValue={propertyToEdit?.price}
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
            defaultValue={propertyToEdit?.bedrooms}
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
            defaultValue={propertyToEdit?.bathrooms}
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_pets"
            name="accepts_pets"
            defaultChecked={propertyToEdit?.accepts_pets}
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_pets">Accepts Pets</Label>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Checkbox
            id="accepts_smokers"
            name="accepts_smokers"
            defaultChecked={propertyToEdit?.accepts_smokers}
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="accepts_smokers">Accepts Smokers</Label>
        </div> */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pool"
            name="pool"
            defaultChecked={propertyToEdit?.pool}
            className="data-[state=checked]:bg-[#344E41] border-[#344E41] border-2"
          />
          <Label htmlFor="pool">Pool Available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="garden"
            name="garden"
            defaultChecked={propertyToEdit?.garden}
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
            defaultValue={propertyToEdit?.area}
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
            defaultValue={propertyToEdit?.pet_deposit}
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select
          name="type"
          onValueChange={setSelectedType}
          defaultValue={selectedType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Choose">
              {
                houseTypes.find((type) => type.id === parseInt(selectedType))
                  ?.name
              }
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
        <Select
          name="location"
          onValueChange={setSelectedLocation}
          defaultValue={selectedLocation}
        >
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
          defaultValue={propertyToEdit?.deposit}
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
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-[#344E41] text-white rounded-full p-1 hover:bg-[#A3B18A]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {pending ? (
        <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Updating...
        </Button>
      ) : (
        <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
          Update Property
        </Button>
      )}
    </form>
  );
}
