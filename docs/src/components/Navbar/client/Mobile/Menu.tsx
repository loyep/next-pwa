"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { clsx } from "@/utils/clsx.js";

import { useNavStore } from "../../NavStore.js";
import { NavLinks } from "../Shared/Links.js";

export const NavMobileMenu = () => {
  const { showMobileLinks, setShowMobileLinks } = useNavStore((state) => ({
    showMobileLinks: state.showMobileLinks,
    setShowMobileLinks: state.setShowMobileLinks,
  }));
  const pathname = usePathname();
  useEffect(() => {
    setShowMobileLinks(false);
  }, [setShowMobileLinks, pathname]);
  return (
    <div
      className={clsx("md:hidden", {
        hidden: !showMobileLinks,
      })}
      id="mobile-menu"
    >
      <div className="space-y-1 px-2 pb-3 pt-2">
        <NavLinks type="mobile" />
      </div>
    </div>
  );
};
