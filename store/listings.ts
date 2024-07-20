import { create } from "zustand";

export const useBearStore = create((set) => ({
  bears: 0,
  isSaleListing: true,
  isGrid: true,
  updateIsSaleListing: () =>
    set((state) => ({ isSaleListing: !state.isSaleListing })),
  updateIsGrid: () => set((state) => ({ isGrid: !state.isGrid })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
