"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogsState } from "@/store/dialogs";
import { deleteProperty } from "@/lib/deletePropertyAction";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DialogsStore {
  isDeletePropertyDialogOpen: boolean;
  updateDeletePropertyDialogOpen: () => void;
}

export function DeletePropertyDialog({ property }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isDeletePropertyDialogOpen
  );
  const updateDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateDeletePropertyDialogOpen
  );

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProperty(property.id);
      if (result.success) {
        updateDeletePropertyDialogOpen(); // Close the dialog
        router.refresh(); // Refresh the page to reflect the changes
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("An error occurred while deleting the property.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={isDeletePropertyDialogOpen}
      onOpenChange={updateDeletePropertyDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogDescription className="text-red-600">
            Are you sure you want to delete this property: {property?.title}{" "}
            located in {property?.location?.name} on address {property?.address}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            className="w-full rounded-full"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
