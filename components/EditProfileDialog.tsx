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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useDialogsState } from "@/store/dialogs";
import EditProfileForm from "@/components/forms/EditProfileForm";
import EditTenantProfileForm from "./forms/EditTenantProfileForm";

interface DialogsStore {
  isEditProfileDialogOpen: boolean;
  updateEditProfileDialogOpen: () => void;
}

export function EditProfileDialog({ userType, data }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateEditProfileDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEditProfileDialogOpen
  );
  const isEditProfileDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEditProfileDialogOpen
  );
  const [localIsEditProfileDialogOpen, setLocalIsEditProfileDialogOpen] =
    useState<boolean>(isEditProfileDialogOpen);

  useEffect(() => {
    setLocalIsEditProfileDialogOpen(isEditProfileDialogOpen);
  }, [isEditProfileDialogOpen]);

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog
        open={isEditProfileDialogOpen}
        onOpenChange={updateEditProfileDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {userType?.includes("landlord") ? (
              <DrawerTitle>Edit Landlord Profile</DrawerTitle>
            ) : (
              <DrawerTitle>Edit Tenant Profile</DrawerTitle>
            )}
          </DialogHeader>
          <div className={scrollableContentStyle}>
            {userType?.includes("landlord") ? (
              <EditProfileForm data={data} />
            ) : (
              <EditTenantProfileForm data={data} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isEditProfileDialogOpen}
      onOpenChange={updateEditProfileDialogOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          {userType?.includes("landlord") ? (
            <DrawerTitle>Edit Landlord Profile</DrawerTitle>
          ) : (
            <DrawerTitle>Edit Tenant Profile</DrawerTitle>
          )}
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>
          {userType?.includes("landlord") ? (
            <EditProfileForm data={data} />
          ) : (
            <EditTenantProfileForm data={data} />
          )}
          {/* <EditProfileForm userType={userType} /> */}
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
