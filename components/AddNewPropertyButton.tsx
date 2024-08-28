"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { useDialogsState } from "@/store/dialogs";
import { useEffect, useState } from "react";

interface DialogsStore {
  isAddNewPropertyDialogOpen: boolean;
  updateAddNewPropertyDialogOpen: () => void;
}

const AddNewPropertyButton = () => {
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
  return (
    <>
      <Button onClick={() => updateAddNewPropertyDialogOpen()}>
        New Listing
      </Button>
    </>
  );
};

export default AddNewPropertyButton;
