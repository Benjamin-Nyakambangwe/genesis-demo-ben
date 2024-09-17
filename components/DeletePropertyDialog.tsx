import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogsState } from "@/store/dialogs";

interface DialogsStore {
  isDeletePropertyDialogOpen: boolean;
  updateDeletePropertyDialogOpen: () => void;
}

export function DeletePropertyDialog({ property }) {
  const isDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isDeletePropertyDialogOpen
  );
  const updateDeletePropertyDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateDeletePropertyDialogOpen
  );

  return (
    <Dialog
      open={isDeletePropertyDialogOpen}
      onOpenChange={updateDeletePropertyDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogDescription className="text-red-600">
            Are you sure you want to delete this property: {property.title}{" "}
            located in {property.location.name} on address {property.address}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            className="w-full rounded-full"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
