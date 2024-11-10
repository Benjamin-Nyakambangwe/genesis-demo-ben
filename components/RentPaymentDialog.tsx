"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogsState } from "@/store/dialogs";
import { submitRentPaymentAction } from "@/lib/submitRentPayment";

interface DialogsStore {
  isRentPaymentDialogOpen: boolean;
  updateRentPaymentDialogOpen: () => void;
}

export function RentPaymentDialog({ payment }: { payment: Payment }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateRentPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateRentPaymentDialogOpen
  );
  const isRentPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isRentPaymentDialogOpen
  );
  const [localIsRentPaymentDialogOpen, setLocalIsRentPaymentDialogOpen] =
    useState<boolean>(isRentPaymentDialogOpen);
  const [phone, setPhone] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setLocalIsRentPaymentDialogOpen(isRentPaymentDialogOpen);
  }, [isRentPaymentDialogOpen]);

  const tenantEmail = payment.property.current_tenant.email;
  const paymentId = payment.id;
  const amount = payment.amount;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitRentPaymentAction({
        tenantEmail,
        phone,
        paymentId,
      });
      setPaymentStatus(result);
      if (result.success) {
        // Optionally close the dialog or reset the form
        updateRentPaymentDialogOpen();
        window.location.reload();
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      setPaymentStatus({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  const content = (
    <form onSubmit={handlePayment}>
      <div className="items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Ecocash Number
        </Label>
        <Input
          id="phone"
          type="tel"
          className="col-span-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {paymentStatus && (
          <div
            className={`text-sm ${
              paymentStatus.success ? "text-green-600" : "text-red-600"
            } mt-2`}
          >
            {paymentStatus.message}
          </div>
        )}
        <Button
          type="submit"
          className="bg-[#344E41] text-white hover:bg-[#A3B18A] mt-4 w-full rounded-full"
        >
          Pay
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isRentPaymentDialogOpen}
        onOpenChange={updateRentPaymentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rent Payment</DialogTitle>
            <DialogDescription>
              {payment.property.title} - {amount}
            </DialogDescription>
          </DialogHeader>
          <div className={scrollableContentStyle}>{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isRentPaymentDialogOpen}
      onOpenChange={updateRentPaymentDialogOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Rent Payment</DrawerTitle>
          <DrawerDescription>
            {payment.property.title} - {amount}
          </DrawerDescription>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>{content}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
