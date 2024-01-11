import { create } from "zustand";

import type { ColorScheme } from "@/shared/types.js";

export interface ColorSchemeStoreInterface {
  colorScheme: ColorScheme | null;
  setColorScheme: (_: ColorScheme) => void;
  toggleColorScheme: (_?: ColorScheme) => void;
}

export const useColorScheme = create<ColorSchemeStoreInterface>((set, get) => ({
  colorScheme: null,
  setColorScheme(val) {
    set({ colorScheme: val });
    document.documentElement.dataset.theme = val;
    localStorage.setItem("theme", val);
  },
  toggleColorScheme(value) {
    const nextColorScheme = value || (get().colorScheme === "dark" ? "light" : "dark");
    get().setColorScheme(nextColorScheme);
  },
}));
