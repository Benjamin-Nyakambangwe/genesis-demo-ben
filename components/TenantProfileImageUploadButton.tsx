"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";

const TenantProfileImageUploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const result = await submitEditTenantProfileFormAction(formData);
      if (result.success) {
        alert("Profile image uploaded successfully");
      } else {
        alert();
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
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        onClick={triggerFileInput}
        disabled={isUploading}
        className="w-full rounded-full bg-red-600"
      >
        {isUploading ? "Uploading..." : "Upload Profile Image"}
      </Button>
    </div>
  );
};

export default TenantProfileImageUploadButton;
