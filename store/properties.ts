import { create } from "zustand";
import { Property } from "./dialogs"; // Import the Property type

interface PropertiesState {
  properties: Property[];
  addProperty: (property: Property) => void;
  setProperties: (properties: Property[]) => void;
  showPropertyDetails: boolean;
  currentPropertyId: string | null;
  updateShowPropertyDetails: (
    showPropertyDetails: boolean,
    propertyId?: string
  ) => void;
  updateCurrentPropertyId: (propertyId: string) => void;
}

export const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  showPropertyDetails: false,
  currentPropertyId: null,

  updateShowPropertyDetails: () =>
    set((state) => {
      console.log(
        "Updating show property details:",
        !state.showPropertyDetails
      );
      return { showPropertyDetails: !state.showPropertyDetails };
    }),
  addProperty: (property) =>
    set((state) => ({ properties: [...state.properties, property] })),
  setProperties: (properties) => set({ properties }),
  updateCurrentPropertyId: (propertyId) =>
    set(() => {
      console.log("Saving current property ID:", propertyId);
      return { currentPropertyId: propertyId };
    }),
}));
