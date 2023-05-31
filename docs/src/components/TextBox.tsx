import type { ReactNode } from "react";

import { clsx } from "@/utils/clsx.js";

import { LinkActive } from "./LinkActive.js";

const baseTextBoxClassName =
  "items-center cursor-pointer justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word]";
const hoverTextBoxClassName =
  "text-gray-500 dark:text-neutral-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-neutral-800 dark:hover:text-white";
const activeTextBoxClassName =
  "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-gray-50";

export interface TextBoxProps {
  href: string | undefined;
  children: ReactNode;
}

export const TextBox = ({ href, children }: TextBoxProps) => {
  if (!href) {
    return (
      <button className={clsx(baseTextBoxClassName, hoverTextBoxClassName)}>
        {children}
      </button>
    );
  }
  return (
    <LinkActive
      href={href}
      activeClassName={clsx(baseTextBoxClassName, activeTextBoxClassName)}
      hoverClassName={clsx(baseTextBoxClassName, hoverTextBoxClassName)}
    >
      {children}
    </LinkActive>
  );
};
