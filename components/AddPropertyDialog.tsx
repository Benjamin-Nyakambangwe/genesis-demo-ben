"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
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
import AddNewPropertyForm from "@/components/forms/AddNewPropertyForm";
import { useDialogsState } from "@/store/dialogs";

interface DialogsStore {
  isAddNewPropertyDialogOpen: boolean;
  updateAddNewPropertyDialogOpen: () => void;
}

interface AddNewPropertyDialogProps {
  userType: string;
  houseTypes: Array<{ id: string; name: string }>;
  houseLocations: Array<{ id: string; name: string }>;
  userToken: string;
}

export function AddNewPropertyDialog({
  userType,
  houseTypes,
  houseLocations,
  userToken,
}: AddNewPropertyDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateAddNewPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateAddNewPropertyDialogOpen
  );
  const isAddNewPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isAddNewPropertyDialogOpen
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateAddNewPropertyDialogOpen();
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog open={isAddNewPropertyDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
          <div className={scrollableContentStyle}>
            <AddNewPropertyForm
              houseTypes={houseTypes}
              houseLocations={houseLocations}
              userToken={userToken}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAddNewPropertyDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Property</DrawerTitle>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>
          <AddNewPropertyForm
            className="px-4"
            houseTypes={houseTypes}
            houseLocations={houseLocations}
          />
        </div>
        <DrawerFooter className="pt-2">
          {/* <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
