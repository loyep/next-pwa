"use client";
import { usePathname } from "next/navigation";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { clsx } from "@/utils/clsx";

const baseActiveBoxClassName = "items-center justify-between gap-2 text-left w-full flex rounded text-sm transition-colors [word-break:break-word]";
const hoverActiveBoxClassName =
  "text-neutral-700 dark:text-neutral-300 hover:bg-gray-200 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white";
const activeActiveBoxClassName = "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-gray-50";

export interface ActiveBoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  href: string | undefined;
}

export const ActiveBox = ({ href, className, ...rest }: ActiveBoxProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return <div className={clsx(baseActiveBoxClassName, isActive ? activeActiveBoxClassName : hoverActiveBoxClassName, className)} {...rest} />;
};
