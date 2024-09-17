import { create } from "zustand";
import { Property } from "./dialogs"; // Import the Property type

interface PropertiesState {
  properties: Property[];
  addProperty: (property: Property) => void;
  setProperties: (properties: Property[]) => void;
}

export const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  addProperty: (property) =>
    set((state) => ({ properties: [...state.properties, property] })),
  setProperties: (properties) => set({ properties }),
}));
