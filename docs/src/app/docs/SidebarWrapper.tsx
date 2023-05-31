"use client";
import type { ReactNode } from "react";

import { useSidebar } from "@/store/index.js";
import { clsx } from "@/utils/clsx.js";

export const SidebarWrapper = ({ children }: { children: ReactNode }) => {
  const { isMobileExpanded } = useSidebar((state) => ({
    isMobileExpanded: state.isMobileExpanded,
  }));
  return (
    <aside
      className={clsx(
        "flex flex-col fixed w-full transform-gpu transition-all ease-in-out print:hidden",
        "md:top-0 md:sticky md:shrink-0 md:w-64 md:self-start",
        isMobileExpanded
          ? "max-md:[transform:translate3d(0,0,0)]"
          : "max-md:[transform:translate3d(0,-100%,0)]"
      )}
    >
      {children}
    </aside>
  );
};
