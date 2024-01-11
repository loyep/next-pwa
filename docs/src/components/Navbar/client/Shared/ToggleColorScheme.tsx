"use client";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { useColorScheme } from "@/store/index.js";
import { clsx } from "@/utils/clsx.js";

export type NavToggleSchemeButtonProps = ComponentPropsWithoutRef<"button">;

export const NavToggleSchemeButton = forwardRef<HTMLButtonElement, NavToggleSchemeButtonProps>(({ className, ...rest }, ref) => {
  const { colorScheme, toggleColorScheme } = useColorScheme((state) => ({
    colorScheme: state.colorScheme,
    toggleColorScheme: state.toggleColorScheme,
  }));
  const dark = colorScheme === "dark";
  return (
    <button
      type="button"
      onClick={() => {
        toggleColorScheme();
      }}
      className={twMerge(
        clsx("transition-colors_opa h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] border bg-transparent duration-100", {
          "border-yellow-500 text-yellow-500 hover:bg-yellow-200/[0.6]": !dark,
          "border-sky-400 text-sky-400 hover:bg-sky-600/[0.2]": dark,
        }),
        className,
      )}
      aria-label={`Toggle color scheme, current is ${colorScheme}`}
      ref={ref}
      {...rest}
    >
      {dark ? <IconMoonStars size={18} aria-hidden /> : <IconSun size={18} aria-hidden />}
    </button>
  );
});

NavToggleSchemeButton.displayName = "Nav.ToggleSchemeButton";
