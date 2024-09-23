"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { useDialogsState } from "@/store/dialogs";
import { useEffect, useState } from "react";

interface DialogsStore {
  isEditProfileDialogOpen: boolean;
  updateEditProfileDialogOpen: () => void;
}
const EditProfileButton = () => {
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
  return (
    <>
      <Button
        className="text-[#344E41] border-[#344E41] font-bold border-2 rounded-full"
        variant="outlined"
        onClick={() => updateEditProfileDialogOpen()}
      >
        Edit Profile
      </Button>
    </>
  );
};

export default EditProfileButton;
