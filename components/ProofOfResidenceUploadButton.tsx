"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";
import { FileDown } from "lucide-react";
const ProofOfResidenceUploadButton = ({
  proof_of_residence,
}: {
  proof_of_residence: string;
}) => {
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

  const handleDownload = async () => {
    if (!proof_of_residence) {
      alert("No proof of residence available to download");
      return;
    }

    try {
      const response = await fetch(proof_of_residence);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "proof_of_residence" + proof_of_residence.split(".").pop(); // Gets the file extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading proof of residence:", error);
      alert("An error occurred while downloading the proof of residence");
    }
  };

  return (
    <div className="flex items-center gap-2">
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
          className="w-full rounded-full bg-[#344E41] hover:bg-[#A3B18A]"
        >
          {isUploading ? "Uploading..." : "Proof of Residence"}
        </Button>
      </div>
      <div
        className="p-2 rounded-full border-2 border-[#344E41] flex items-center justify-center cursor-pointer hover:bg-[#A3B18A] hover:border-[#A3B18A] hover:text-white transition-colors"
        onClick={handleDownload}
        title={
          proof_of_residence
            ? "Download Proof of Residence"
            : "No proof of residence available"
        }
      >
        <FileDown className="text-[#344E41] h-6 w-6 hover:text-white" />
      </div>
    </div>
  );
};

export default ProofOfResidenceUploadButton;
