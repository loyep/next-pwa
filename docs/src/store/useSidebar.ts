import { create } from "zustand";

export interface SidebarStoreInterface {
  isMobileExpanded: boolean;
  setIsMobileExpanded: (_: boolean) => void;
}

export const useSidebar = create<SidebarStoreInterface>((set) => ({
  isMobileExpanded: false,
  setIsMobileExpanded(value) {
    set({ isMobileExpanded: value });
  },
}));
