import { create } from "zustand";

export interface NavStoreInterface {
  showMobileLinks: boolean;
  setShowMobileLinks: (_: boolean) => void;
}

export const useNavStore = create<NavStoreInterface>((set) => ({
  showMobileLinks: false,
  setShowMobileLinks: (_) => set({ showMobileLinks: _ }),
}));
