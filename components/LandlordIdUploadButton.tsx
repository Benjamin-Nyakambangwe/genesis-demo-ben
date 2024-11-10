"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitEditProfileFormAction } from "@/lib/submitEditProfileFormAction";
import { FileDown } from "lucide-react";

const LandlordIdUploadButton = ({ idImage }: { idImage: string }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to ensure HTTPS URL
  const getSecureUrl = (url: string) => {
    if (url && url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("id_image", file);

    try {
      const result = await submitEditProfileFormAction(formData);
      if (result.success) {
        alert("ID image uploaded successfully");
      } else {
        alert(result.message);
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

  const handleDownload = async () => {
    const secureImageUrl = getSecureUrl(idImage);

    if (!secureImageUrl) {
      alert("No ID image available to download");
      return;
    }

    console.log("ID UPLOAD URL", secureImageUrl);

    try {
      const response = await fetch(secureImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "id-image" + secureImageUrl.split(".").pop(); // Gets the file extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading ID image:", error);
      alert("An error occurred while downloading the ID image");
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
          className="w-full rounded-full text-[#344E41] border-[#344E41] border-2 font-bold hover:bg-[#A3B18A] hover:text-white"
          variant="outline"
        >
          {isUploading ? "Uploading..." : "Upload ID Image"}
        </Button>
      </div>
      <div
        className="p-2 rounded-full border-2 border-[#344E41] flex items-center justify-center cursor-pointer hover:bg-[#A3B18A] hover:border-[#A3B18A] hover:text-white transition-colors"
        onClick={handleDownload}
        title={idImage ? "Download ID Image" : "No ID image available"}
      >
        <FileDown className="text-[#344E41] h-6 w-6 hover:text-white" />
      </div>
    </div>
  );
};

export default LandlordIdUploadButton;
