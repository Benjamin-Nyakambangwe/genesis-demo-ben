"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";

const LandlordProfileImageUploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const result = await submitEditProfileFormAction(formData);
      if (result.success) {
        alert("Profile image uploaded successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("An error occurred while uploading the profile image");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*,.pdf,.doc,.docx"
        style={{ display: "none" }}
      />
      <Button
        onClick={triggerFileInput}
        disabled={isUploading}
        className="w-full rounded-full text-red-600 border-red-600 border-2 hover:bg-red-600 hover:text-white"
        variant="outline"
      >
        {isUploading ? "Uploading..." : "Upload Profile Image"}
      </Button>
    </div>
  );
};

export default LandlordProfileImageUploadButton;
