"use client";
import { IconChevronRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import { clsx } from "@/utils/clsx.js";

interface SidebarClientProps {
  children: ReactNode;
  sidebarBaseClass: string;
  sidebarButtonClass: string;
}

const SidebarClientMain = ({
  children,
  sidebarBaseClass,
  sidebarButtonClass,
}: SidebarClientProps) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  return (
    <>
      <button
        className={sidebarButtonClass}
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      >
        <IconChevronRight
          className={clsx(
            "transition-transform duration-100",
            isMobileExpanded && "rotate-90"
          )}
          width={12}
          height={12}
          aria-hidden
        />{" "}
        Menu
      </button>
      <aside
        className={clsx(
          sidebarBaseClass,
          !isMobileExpanded && "max-md:[transform:translate3d(0,-100%,0)]"
        )}
      >
        {children}
      </aside>
    </>
  );
};

export const SidebarClient = (props: SidebarClientProps) => {
  const pathname = usePathname();
  return <SidebarClientMain key={pathname} {...props} />;
};
