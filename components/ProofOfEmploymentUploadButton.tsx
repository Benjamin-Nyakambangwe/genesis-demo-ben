"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";

const ProofOfEmploymentUploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("proof_of_employment", file);

    try {
      const result = await submitEditTenantProfileFormAction(formData);
      if (result.success) {
        alert("Proof of employment uploaded successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error uploading proof of employment:", error);
      alert("An error occurred while uploading the proof of employment");
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
        className="w-full rounded-full text-[#344E41] border-[#344E41] hover:bg-[#A3B18A] border-2 font-bold hover:text-white"
        variant="outline"
      >
        {isUploading ? "Uploading..." : "Proof of Employment"}
      </Button>
    </div>
  );
};

export default ProofOfEmploymentUploadButton;
