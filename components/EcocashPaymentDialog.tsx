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
import { submitPaymentAction } from "@/lib/submitPayment";

interface DialogsStore {
  isEcocashPaymentDialogOpen: boolean;
  updateEcocashPaymentDialogOpen: () => void;
}

export function EcocashPaymentDialog({ plan }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateEcocashPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEcocashPaymentDialogOpen
  );
  const isEcocashPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEcocashPaymentDialogOpen
  );
  const [localIsEcocashPaymentDialogOpen, setLocalIsEcocashPaymentDialogOpen] =
    useState<boolean>(isEcocashPaymentDialogOpen);
  const [phone, setPhone] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setLocalIsEcocashPaymentDialogOpen(isEcocashPaymentDialogOpen);
  }, [isEcocashPaymentDialogOpen]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitPaymentAction({ plan, phone });
      setPaymentStatus(result);
      if (result.success) {
        // Optionally close the dialog or reset the form
        // updateEcocashPaymentDialogOpen();
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
          Phone Number
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
        open={isEcocashPaymentDialogOpen}
        onOpenChange={updateEcocashPaymentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ecocash Payment</DialogTitle>
            <DialogDescription>{plan.name}</DialogDescription>
          </DialogHeader>
          <div className={scrollableContentStyle}>{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isEcocashPaymentDialogOpen}
      onOpenChange={updateEcocashPaymentDialogOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Ecocash Payment</DrawerTitle>
          <DrawerDescription>{plan.name}</DrawerDescription>
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
