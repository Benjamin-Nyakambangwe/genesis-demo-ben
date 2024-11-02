"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditTenantProfileFormAction } from "@/lib/submitEditTenantProfileFormAction";
import { FileDown } from "lucide-react";

const ProofOfEmploymentUploadButton = ({
  proof_of_employment,
}: {
  proof_of_employment: string;
}) => {
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

  const handleDownload = async () => {
    if (!proof_of_employment) {
      alert("No proof of employment available to download");
      return;
    }

    try {
      const response = await fetch(proof_of_employment);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "proof_of_employment" + proof_of_employment.split(".").pop(); // Gets the file extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading proof of employment:", error);
      alert("An error occurred while downloading the proof of employment");
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
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
      <div
        className="p-2 rounded-full border-2 border-[#344E41] flex items-center justify-center cursor-pointer hover:bg-[#A3B18A] hover:border-[#A3B18A] hover:text-white transition-colors"
        onClick={handleDownload}
        title={
          proof_of_employment
            ? "Download Proof of Employment"
            : "No proof of employment available"
        }
      >
        <FileDown className="text-[#344E41] h-6 w-6 hover:text-white" />
      </div>
    </div>
  );
};

export default ProofOfEmploymentUploadButton;
