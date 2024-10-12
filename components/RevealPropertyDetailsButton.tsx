"use client";

import React from "react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { useDialogsState } from "@/store/dialogs";
import { ConfirmPropertyDetailsDialog } from "./ConfirmPropertyDetailsRevealDialog";

interface RevealPropertyDetailsButtonProps {
  price: number;
  propertyId: string;
}

const RevealPropertyDetailsButton: React.FC<
  RevealPropertyDetailsButtonProps
> = ({ price, propertyId }) => {
  const updateConfirmPropertyDetailsDialogOpen = useDialogsState(
    (state) => state.updateConfirmPropertyDetailsDialogOpen
  );

  const handleClick = () => {
    updateConfirmPropertyDetailsDialogOpen();
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full mb-2 text-[#344E41] border-[#344E41]"
        onClick={handleClick}
      >
        <Phone className="h-3 w-3 mr-2 text-[#344E41]" />
        Reveal Property Details
      </Button>
      <ConfirmPropertyDetailsDialog price={price} propertyId={propertyId} />
    </>
  );
};

export default RevealPropertyDetailsButton;
