"use client";

import { Button } from "@/components/ui/button";
import { useDialogsState } from "@/store/dialogs";
import { RentPaymentDialog } from "./RentPaymentDialog";

interface RentPaymentButtonProps {
  payment: {
    id: number;
    amount: string;
    property: {
      title: string;
    };
  };
}

export function RentPaymentButton({ payment }: RentPaymentButtonProps) {
  const { updateRentPaymentDialogOpen } = useDialogsState();

  return (
    <>
      <Button
        className="bg-[#344E41] hover:bg-[#A3B18A] text-white"
        size="sm"
        onClick={() => updateRentPaymentDialogOpen()}
      >
        Pay Now
      </Button>
      <RentPaymentDialog payment={payment} />
    </>
  );
}
