"use client";

import * as React from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import RequestWithdrawalForm from "@/components/forms/RequestWithdrawalForm";
import { useDialogsState } from "@/store/dialogs";
import { Button } from "./ui/button";

interface DialogsStore {
  isRequestWithdrawalDialogOpen: boolean;
  updateRequestWithdrawalDialogOpen: () => void;
}

export function RequestWithdrawalDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateRequestWithdrawalDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateRequestWithdrawalDialogOpen
  );
  const isRequestWithdrawalDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isRequestWithdrawalDialogOpen
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateRequestWithdrawalDialogOpen();
    }
  };

  const handleSuccess = () => {
    // Close the dialog after successful submission
    updateRequestWithdrawalDialogOpen();
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog
        open={isRequestWithdrawalDialogOpen}
        onOpenChange={handleOpenChange}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
          </DialogHeader>
          <div className={scrollableContentStyle}>
            <RequestWithdrawalForm onSuccess={handleSuccess} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isRequestWithdrawalDialogOpen}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Request Withdrawal</DrawerTitle>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>
          <RequestWithdrawalForm className="px-4" onSuccess={handleSuccess} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
