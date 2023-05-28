"use client";
import { useHotkeys } from "@mantine/hooks";
import { useEffect } from "react";

import { useColorScheme } from "@/store/index.js";
import { isColorScheme } from "@/utils/isColorScheme.js";

let didCalcInitCScheme = false;

export const RootClientLogic = () => {
  const { setColorScheme, toggleColorScheme } = useColorScheme((state) => ({
    colorScheme: state.colorScheme,
    setColorScheme: state.setColorScheme,
    toggleColorScheme: state.toggleColorScheme,
  }));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  useEffect(() => {
    if (!didCalcInitCScheme) {
      didCalcInitCScheme = true;
      const newTheme = document.documentElement.dataset.theme;
      setColorScheme(isColorScheme(newTheme) ? newTheme : "light");
    }
  }, [setColorScheme]);
  return <></>;
};
