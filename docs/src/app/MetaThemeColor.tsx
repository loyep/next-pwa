"use client";
import { useColorScheme } from "@/store/index.js";

export const MetaThemeColor = () => {
  const { colorScheme } = useColorScheme((state) => ({
    colorScheme: state.colorScheme,
  }));
  const dark = colorScheme === "dark";
  return <meta name="theme-color" content={dark ? "#000000" : "#FFFFFF"} />;
};
