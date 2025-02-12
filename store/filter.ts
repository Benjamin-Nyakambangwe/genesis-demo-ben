import { create } from "zustand";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  minArea: number;
  maxArea: number;
  propertyType: string;
  location: string;
  isAvailable: boolean | null;
  acceptsPets: boolean | null;
  acceptsSmokers: boolean | null;
  hasPool: boolean | null;
  hasGarden: boolean | null;
  hasSolarPower: boolean | null;
  hasBorehole: boolean | null;
  updateMinPrice: (num: number) => void;
  updateMaxPrice: (num: number) => void;
  updateMinBedrooms: (num: number) => void;
  updateMaxBedrooms: (num: number) => void;
  updateMinBathrooms: (num: number) => void;
  updateMaxBathrooms: (num: number) => void;
  updateMinArea: (num: number) => void;
  updateMaxArea: (num: number) => void;
  updatePropertyType: (str: string) => void;
  updateLocation: (str: string) => void;
  updateIsAvailable: (bool: boolean | null) => void;
  updateAcceptsPets: (bool: boolean | null) => void;
  updateAcceptsSmokers: (bool: boolean | null) => void;
  updateHasPool: (bool: boolean | null) => void;
  updateHasGarden: (bool: boolean | null) => void;
  updateHasSolarPower: (bool: boolean | null) => void;
  updateHasBorehole: (bool: boolean | null) => void;
}

export const useFilterState = create<FilterState>((set) => ({
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  maxBedrooms: 0,
  minBathrooms: 0,
  maxBathrooms: 0,
  minArea: 0,
  maxArea: 0,
  propertyType: "",
  location: "",
  isAvailable: null,
  acceptsPets: null,
  acceptsSmokers: null,
  hasPool: null,
  hasGarden: null,
  hasSolarPower: null,
  hasBorehole: null,
  updateHasGarden: (bool: boolean | null) => set({ hasGarden: bool }),
  updateHasPool: (bool: boolean | null) => set({ hasPool: bool }),
  updateHasSolarPower: (bool: boolean | null) => set({ hasSolarPower: bool }),
  updateHasBorehole: (bool: boolean | null) => set({ hasBorehole: bool }),
  updateMinPrice: (num: number) => set({ minPrice: num }),
  updateMaxPrice: (num: number) => set({ maxPrice: num }),
  updateMinBedrooms: (num: number) => set({ minBedrooms: num }),
  updateMaxBedrooms: (num: number) => set({ maxBedrooms: num }),
  updateMinBathrooms: (num: number) => set({ minBathrooms: num }),
  updateMaxBathrooms: (num: number) => set({ maxBathrooms: num }),
  updateMinArea: (num: number) => set({ minArea: num }),
  updateMaxArea: (num: number) => set({ maxArea: num }),
  updatePropertyType: (str: string) => set({ propertyType: str }),
  updateLocation: (str: string) => set({ location: str }),
  updateIsAvailable: (bool: boolean | null) => set({ isAvailable: bool }),
  updateAcceptsPets: (bool: boolean | null) => set({ acceptsPets: bool }),
  updateAcceptsSmokers: (bool: boolean | null) => set({ acceptsSmokers: bool }),
}));
