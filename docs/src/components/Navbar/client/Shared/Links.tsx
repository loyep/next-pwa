"use client";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import { LINKS } from "../../constants.js";
import { NavLink } from "../../Link/index.js";

export interface NavLinksProps {
  type: "desktop" | "mobile";
}

export const NavLinks: FC<NavLinksProps> = ({ type }) => {
  const pathname = usePathname();
  return (
    <>
      {LINKS.map(({ link, label }) => (
        <NavLink
          key={`navlink-${type}-screen-${label}`}
          href={link}
          isActive={
            !!pathname &&
            (link === "/" ? pathname === link : pathname.startsWith(link))
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
};
