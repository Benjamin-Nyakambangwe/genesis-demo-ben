import { create } from "zustand";

// Define a Property type
export interface Property {
  id: string | number;
  images: { image: string }[];
  type: { id: number; name: string };
  location: { id: number; name: string };
  title: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  area: string;
  price: number;
  accepts_pets: boolean;
  accepts_smokers: boolean;
  pool: boolean;
  garden: boolean;
  description: string;
  deposit: number;
  pet_deposit?: number;
}

interface DialogsState {
  isAddNewPropertyDialogOpen: boolean;
  updateAddNewPropertyDialogOpen: () => void;
  isEditProfileDialogOpen: boolean;
  updateEditProfileDialogOpen: () => void;
  isEditPropertyDialogOpen: boolean;
  updateEditPropertyDialogOpen: () => void;
  propertyToEdit: Property | null;
  updatePropertyToEdit: (property: Property) => void;
  isDeletePropertyDialogOpen: boolean;
  updateDeletePropertyDialogOpen: () => void;
}

export const useDialogsState = create<DialogsState>((set) => ({
  isAddNewPropertyDialogOpen: false,
  isEditProfileDialogOpen: false,
  isEditPropertyDialogOpen: false,
  propertyToEdit: null,
  isDeletePropertyDialogOpen: false,

  updateDeletePropertyDialogOpen: () =>
    set((state) => ({
      isDeletePropertyDialogOpen: !state.isDeletePropertyDialogOpen,
    })),
  updatePropertyToEdit: (property: Property) =>
    set(() => {
      console.log("Saving property to edit:", property);
      return { propertyToEdit: property };
    }),
  updateEditPropertyDialogOpen: () =>
    set((state) => ({
      isEditPropertyDialogOpen: !state.isEditPropertyDialogOpen,
    })),
  updateEditProfileDialogOpen: () =>
    set((state) => ({
      isEditProfileDialogOpen: !state.isEditProfileDialogOpen,
    })),
  updateAddNewPropertyDialogOpen: () =>
    set((state) => ({
      isAddNewPropertyDialogOpen: !state.isAddNewPropertyDialogOpen,
    })),
}));
