"use client";

import React from "react";
import { usePropertiesStore } from "@/store/properties";

interface CopyProtectedContentProps {
  children: React.ReactNode;
}

interface PropertiesStore {
  showPropertyDetails: boolean;
  currentPropertyId: string;
}

export default function CopyProtectedContent({
  children,
  listingId,
  hasAccess,
}: CopyProtectedContentProps) {
  const preventCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const { showPropertyDetails, currentPropertyId } = usePropertiesStore();

  return (
    <div
      className="flex flex-col items-center select-none"
      onCopy={preventCopy}
    >
      {showPropertyDetails && currentPropertyId === listingId && children}
      {hasAccess && children}
    </div>
  );
}
