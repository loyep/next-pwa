"use client";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { ActiveBox } from "@/components/ActiveBox.js";
import { clsx } from "@/utils/clsx.js";

interface SidebarClientProps {
  children: ReactNode;
}

export const SidebarClient = ({ children }: SidebarClientProps) => {
  const pathname = usePathname();
  const pathnameRef = useRef<string>(pathname);

  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    if (isMobileExpanded) {
      document.body.classList.add("overflow-hidden", "md:overflow-auto");
    }

    return () => {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    };
  }, [isMobileExpanded]);

  if (pathnameRef.current !== pathname) {
    pathnameRef.current = pathname;
    setIsMobileExpanded(false);
  }

  return (
    <div
      className={clsx(
        "z-10 flex w-full flex-col print:hidden",
        "sticky top-[var(--navbar-height)] md:w-64 md:shrink-0 md:self-start",
        isMobileExpanded && "h-[calc(100vh-var(--navbar-height))] md:h-[unset]",
      )}
    >
      <button
        type="button"
        className={clsx(
          "z-20 flex h-fit w-full flex-row items-center justify-start gap-2 px-4 py-3 md:hidden",
          "bg-gray-100 text-black duration-100 dark:bg-neutral-900 dark:text-white",
          "border-b border-neutral-200/70 dark:border-neutral-400/10",
        )}
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      >
        <IconChevronRight className={clsx("transition-transform duration-100", isMobileExpanded && "rotate-90")} width={12} height={12} aria-hidden />{" "}
        Menu
      </button>
      <aside
        className={clsx(
          "h-[calc(100vh-100px)] grow overflow-y-auto overflow-x-hidden px-4 pb-4 md:pt-4",
          "transform-gpu transition-all duration-150 ease-out",
          "bg-gray-100 dark:bg-neutral-900",
          "border-b border-neutral-200/70 dark:border-neutral-400/10",
          !isMobileExpanded && "absolute max-md:[transform:translate(0,-100%)] md:[position:unset]",
        )}
      >
        <ul>{children}</ul>
      </aside>
    </div>
  );
};

interface SidebarTextBoxProps {
  hasChildTree: boolean;
  childTreeReactNode: ReactNode;
  href: string | undefined;
  children: ReactNode;
}

export const SidebarTextBox = ({ href, hasChildTree, childTreeReactNode, ...rest }: SidebarTextBoxProps) => {
  const pathname = usePathname();

  const [isChildOpened, setIsChildOpened] = useState(!!href && pathname.startsWith(href));

  const toggleChildOpened = () => hasChildTree && setIsChildOpened((_state) => !_state);

  return (
    <>
      <ActiveBox href={href} className="flex flex-row items-center">
        {href ? (
          <Link onClick={toggleChildOpened} href={href} className="w-full py-1.5 pl-2" {...rest} />
        ) : (
          <button type="button" onClick={toggleChildOpened} className="w-full py-1.5 pl-2" {...rest} />
        )}
        {hasChildTree && (
          <button type="button" className="h-full py-1.5 pr-2" aria-label={`${isChildOpened ? "Collapse" : "Expand"} section`}>
            <IconChevronRight
              onClick={toggleChildOpened}
              className={clsx(
                "text-gray-700 dark:text-neutral-300",
                "rounded-sm transition-all duration-100",
                "hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-neutral-600 dark:hover:text-gray-50",
                isChildOpened && "rotate-90",
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
