"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";

const ProofOfResidenceUploadButton = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("proof_of_residence", file);

    try {
      const result = await submitEditProfileFormAction(formData);
      if (result.success) {
        alert("Proof of residence uploaded successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error uploading proof of residence:", error);
      alert("An error occurred while uploading the proof of residence");
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
        className="w-full rounded-full bg-red-600"
      >
        {isUploading ? "Uploading..." : "Proof of Residence"}
      </Button>
    </div>
  );
};

export default ProofOfResidenceUploadButton;
