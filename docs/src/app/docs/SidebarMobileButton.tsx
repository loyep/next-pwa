"use client";
import { IconChevronRight } from "@tabler/icons-react";

import { useSidebar } from "@/store/index.js";

export const SidebarMobileButton = () => {
  const { setIsMobileExpanded, isMobileExpanded } = useSidebar((state) => ({
    setIsMobileExpanded: state.setIsMobileExpanded,
    isMobileExpanded: state.isMobileExpanded,
  }));
  return (
    <button
      className="w-full h-fit flex flex-row items-center justify-start p-3 text-black dark:text-white md:hidden"
      onClick={() => setIsMobileExpanded(!isMobileExpanded)}
    >
      <IconChevronRight aria-hidden /> Menu
    </button>
  );
};
