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
  has_solar_power: boolean;
  has_borehole: boolean;
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
  isEcocashPaymentDialogOpen: boolean;
  updateEcocashPaymentDialogOpen: () => void;
  isConfirmPropertyDetailsDialogOpen: boolean;
  updateConfirmPropertyDetailsDialogOpen: () => void;
  isPropertyTenantsDrawerOpen: boolean;
  updatePropertyTenantsDrawerOpen: () => void;
  isRentPaymentDialogOpen: boolean;
  updateRentPaymentDialogOpen: () => void;
  isRequestWithdrawalDialogOpen: boolean;
  updateRequestWithdrawalDialogOpen: () => void;
  isBalanceDialogOpen: boolean;
  updateBalanceDialogOpen: () => void;
}

export const useDialogsState = create<DialogsState>((set) => ({
  isAddNewPropertyDialogOpen: false,
  isEditProfileDialogOpen: false,
  isEditPropertyDialogOpen: false,
  propertyToEdit: null,
  isDeletePropertyDialogOpen: false,
  isEcocashPaymentDialogOpen: false,
  isConfirmPropertyDetailsDialogOpen: false,
  isPropertyTenantsDrawerOpen: false,
  isRentPaymentDialogOpen: false,
  isRequestWithdrawalDialogOpen: false,
  isBalanceDialogOpen: false,
  updateRentPaymentDialogOpen: () =>
    set((state) => ({
      isRentPaymentDialogOpen: !state.isRentPaymentDialogOpen,
    })),
  updateEcocashPaymentDialogOpen: () =>
    set((state) => ({
      isEcocashPaymentDialogOpen: !state.isEcocashPaymentDialogOpen,
    })),
  updateConfirmPropertyDetailsDialogOpen: () =>
    set((state) => ({
      isConfirmPropertyDetailsDialogOpen:
        !state.isConfirmPropertyDetailsDialogOpen,
    })),
  updatePropertyTenantsDrawerOpen: () =>
    set((state) => ({
      isPropertyTenantsDrawerOpen: !state.isPropertyTenantsDrawerOpen,
    })),
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
  updateRequestWithdrawalDialogOpen: () =>
    set((state) => ({
      isRequestWithdrawalDialogOpen: !state.isRequestWithdrawalDialogOpen,
    })),
  updateBalanceDialogOpen: () =>
    set((state) => ({
      isBalanceDialogOpen: !state.isBalanceDialogOpen,
    })),
}));
