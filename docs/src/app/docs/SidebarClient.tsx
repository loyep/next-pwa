"use client";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";

import { ActiveBox } from "@/components/ActiveBox.js";
import { clsx } from "@/utils/clsx.js";

interface SidebarClientProps {
  children: ReactNode;
}

const sidebarButtonClass = clsx(
  "z-20 w-full h-fit flex flex-row gap-2 items-center justify-start px-4 py-3 md:hidden",
  "bg-gray-100 duration-100 dark:bg-neutral-900 text-black dark:text-white",
  "border-b border-neutral-200/70 dark:border-neutral-400/10"
);

const sidebarBaseClass = clsx(
  "overflow-y-auto overflow-x-hidden px-4 pb-4 md:pt-4 grow md:h-[calc(100vh-100px)]",
  "transform-gpu transition-all duration-150 ease-out",
  "bg-gray-100 dark:bg-neutral-900",
  "border-b border-neutral-200/70 dark:border-neutral-400/10"
);

export const SidebarClient = ({ children }: SidebarClientProps) => {
  const pathname = usePathname();
  const pathnameRef = useRef<string>();

  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  if (pathnameRef?.current !== pathname) {
    pathnameRef.current = pathname;
    setIsMobileExpanded(false);
  }

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

interface SidebarTextBoxProps {
  hasChildTree: boolean;
  childTreeReactNode: ReactNode;
  href: string | undefined;
  children: ReactNode;
}

export const SidebarTextBox = ({
  href,
  hasChildTree,
  childTreeReactNode,
  ...rest
}: SidebarTextBoxProps) => {
  const pathname = usePathname();

  const [isChildOpened, setIsChildOpened] = useState(
    !!href && pathname.startsWith(href)
  );

  const toggleChildOpened = () =>
    hasChildTree && setIsChildOpened((_state) => !_state);

  return (
    <>
      <ActiveBox href={href} className="flex flex-row items-center">
        {href ? (
          <Link
            onClick={toggleChildOpened}
            href={href}
            className="pl-2 py-1.5 w-full"
            {...rest}
          />
        ) : (
          <button
            onClick={toggleChildOpened}
            className="pl-2 py-1.5 w-full"
            {...rest}
          />
        )}
        {hasChildTree && (
          <button className="h-full pr-2 py-1.5">
            <IconChevronRight
              onClick={toggleChildOpened}
              className={clsx(
                "text-gray-500 dark:text-neutral-300",
                "transition-all duration-100 rounded-sm",
                "hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-neutral-600 dark:hover:text-gray-50",
                isChildOpened && "rotate-90"
              )}
              width={20}
              height={20}
              aria-hidden
            />
          </button>
        )}
      </ActiveBox>
      {hasChildTree && isChildOpened && childTreeReactNode}
    </>
  );
};
