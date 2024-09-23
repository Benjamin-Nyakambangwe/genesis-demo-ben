"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";

const IdUploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("id_image", file);

    try {
      const result = await submitEditTenantProfileFormAction(formData);
      if (result.success) {
        alert("ID image uploaded successfully");
      } else {
        alert();
      }
    } catch (error) {
      console.error("Error uploading ID image:", error);
      alert("An error occurred while uploading the ID image");
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
        className="w-full rounded-full bg-[#344E41] hover:bg-[#A3B18A]"
      >
        {isUploading ? "Uploading..." : "Upload ID Image"}
      </Button>
    </div>
  );
};

export default IdUploadButton;
