"use client";

import * as React from "react";
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
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useDialogsState } from "@/store/dialogs";
import EditPropertyForm from "@/components/forms/EditPropertyForm";

interface DialogsStore {
  isEditPropertyDialogOpen: boolean;
  updateEditPropertyDialogOpen: () => void;
  propertyToEdit: any; // Replace 'any' with your property type
}

interface EditPropertyDialogProps {
  houseTypes: Array<{ id: string; name: string }>;
  houseLocations: Array<{ id: string; name: string }>;
}

export function EditPropertyDialog({
  houseTypes,
  houseLocations,
}: EditPropertyDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateEditPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEditPropertyDialogOpen
  );
  const isEditPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEditPropertyDialogOpen
  );
  const propertyToEdit = useDialogsState(
    (state: DialogsStore) => state.propertyToEdit
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateEditPropertyDialogOpen();
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog open={isEditPropertyDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <div className={scrollableContentStyle}>
            <EditPropertyForm
              houseTypes={houseTypes}
              houseLocations={houseLocations}
              propertyToEdit={propertyToEdit}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isEditPropertyDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Property</DrawerTitle>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>
          <EditPropertyForm
            className="px-4"
            houseTypes={houseTypes}
            houseLocations={houseLocations}
            propertyToEdit={propertyToEdit}
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
