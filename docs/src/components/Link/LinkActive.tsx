"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

interface LinkActiveProps extends ComponentPropsWithoutRef<typeof Link> {
  activeClassName: string;
  hoverClassName: string;
}

/**
 * `next/link` with support for active and hover classnames.
 * @param props
 * @returns
 */
export const LinkActive = ({
  href,
  activeClassName,
  hoverClassName,
  ...rest
}: LinkActiveProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={isActive ? activeClassName : hoverClassName}
      {...rest}
    />
  );
};
