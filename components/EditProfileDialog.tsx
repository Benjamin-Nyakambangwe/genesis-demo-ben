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
import EditProfileForm from "@/components/forms/EditProfileForm";
import EditTenantProfileForm from "./forms/EditTenantProfileForm";

interface DialogsStore {
  isEditProfileDialogOpen: boolean;
  updateEditProfileDialogOpen: () => void;
}

interface EditProfileDialogProps {
  userType: string;
  data: any; // Replace 'any' with your data type
}

export function EditProfileDialog({ userType, data }: EditProfileDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateEditProfileDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEditProfileDialogOpen
  );
  const isEditProfileDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEditProfileDialogOpen
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateEditProfileDialogOpen();
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog open={isEditProfileDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {userType?.includes("landlord")
                ? "Edit Landlord Profile"
                : "Edit Tenant Profile"}
            </DialogTitle>
          </DialogHeader>
          <div className={scrollableContentStyle}>
            {userType?.includes("landlord") ? (
              <EditProfileForm data={data} />
            ) : (
              <EditTenantProfileForm initialData={data} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isEditProfileDialogOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {userType?.includes("landlord")
              ? "Edit Landlord Profile"
              : "Edit Tenant Profile"}
          </DrawerTitle>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>
          {userType?.includes("landlord") ? (
            <EditProfileForm data={data} />
          ) : (
            <EditTenantProfileForm initialData={data} />
          )}
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
