import { create } from "zustand";

interface DialogsState {
  isAddNewPropertyDialogOpen: boolean;
  updateAddNewPropertyDialogOpen: () => void;
  isEditProfileDialogOpen: boolean;
  updateEditProfileDialogOpen: () => void;
}

export const useDialogsState = create<DialogsState>((set) => ({
  isAddNewPropertyDialogOpen: false,
  isEditProfileDialogOpen: false,

  updateEditProfileDialogOpen: () =>
    set((state) => ({
      isEditProfileDialogOpen: !state.isEditProfileDialogOpen,
    })),
  updateAddNewPropertyDialogOpen: () =>
    set((state) => ({
      isAddNewPropertyDialogOpen: !state.isAddNewPropertyDialogOpen,
    })),
}));
