import { create } from "zustand";

interface BearState {
  bears: number;
  isSaleListing: boolean;
  isGrid: boolean;
  updateIsSaleListing: () => void;
  updateIsGrid: () => void;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  isSaleListing: true,
  isGrid: true,
  updateIsSaleListing: () =>
    set((state) => ({ isSaleListing: !state.isSaleListing })),
  updateIsGrid: () => set((state) => ({ isGrid: !state.isGrid })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
