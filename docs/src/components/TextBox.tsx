import type { ReactNode } from "react";

import { clsx } from "@/utils/clsx.js";

import { LinkActive } from "./LinkActive.js";

const baseTextBoxClassName = clsx(
  "items-center cursor-pointer justify-between gap-2 text-left w-full flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word]",
  "contrast-more:border contrast-more:border-transparent"
);
const hoverTextBoxClassName = clsx(
  "text-gray-500 dark:text-neutral-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-neutral-800 dark:hover:text-gray-50",
  "contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50"
);
const activeTextBoxClassName =
  "bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-gray-50 contrast-more:border-gray-900 contrast-more:dark:border-gray-50";

export const TextBox = ({
  href,
  children,
}: {
  href: string | undefined;
  children: ReactNode;
}) => {
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
