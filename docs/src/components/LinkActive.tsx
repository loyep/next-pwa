"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, FC } from "react";

interface LinkActiveProps extends ComponentPropsWithoutRef<typeof Link> {
  activeClassName: string;
  hoverClassName: string;
}

export const LinkActive: FC<LinkActiveProps> = ({
  href,
  activeClassName,
  hoverClassName,
  ...rest
}) => {
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
