"use client";
import { IconMenu2 } from "@tabler/icons-react";
import type { FC } from "react";

import { useNavStore } from "../../NavStore.js";
import { NavToggleSchemeButton } from "../Shared/ToggleColorScheme.js";

export const NavMobileBurger: FC = () => {
  const { showMobileLinks, setShowMobileLinks } = useNavStore((state) => ({
    showMobileLinks: state.showMobileLinks,
    setShowMobileLinks: state.setShowMobileLinks,
  }));
  return (
    <>
      <button
        type="button"
        className="transition-colors_opa inline-flex items-center justify-center rounded-md bg-transparent p-2 text-neutral-700 duration-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-transparent dark:text-gray-300 dark:hover:bg-neutral-800"
        aria-controls="mobile-menu"
        aria-expanded={showMobileLinks}
        aria-label="Toggle navigation bar's links for mobile"
        onClick={() => {
          setShowMobileLinks(!showMobileLinks);
        }}
      >
        <IconMenu2 aria-hidden />
      </button>
      <NavToggleSchemeButton className="flex" />
    </>
  );
};

NavMobileBurger.displayName = "Nav.Burger";
