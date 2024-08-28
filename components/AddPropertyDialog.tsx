"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDialogsState } from "@/store/dialogs";
import AddNewPropertyForm from "@/components/forms/AddNewPropertyForm";

interface DialogsStore {
  isAddNewPropertyDialogOpen: boolean;
  updateAddNewPropertyDialogOpen: () => void;
}

export function AddNewPropertyDialog({ userType, houseTypes, houseLocations }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateAddNewPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateAddNewPropertyDialogOpen
  );
  const isAddNewPropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isAddNewPropertyDialogOpen
  );
  const [localIsAddNewPropertyDialogOpen, setLocalIsAddNewPropertyDialogOpen] =
    useState<boolean>(isAddNewPropertyDialogOpen);

  useEffect(() => {
    setLocalIsAddNewPropertyDialogOpen(isAddNewPropertyDialogOpen);
  }, [isAddNewPropertyDialogOpen]);

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  if (isDesktop) {
    return (
      <Dialog
        open={isAddNewPropertyDialogOpen}
        onOpenChange={updateAddNewPropertyDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
          <div className={scrollableContentStyle}>
            <AddNewPropertyForm
              houseTypes={houseTypes}
              houseLocations={houseLocations}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isAddNewPropertyDialogOpen}
      onOpenChange={updateAddNewPropertyDialogOpen}
    >
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
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
