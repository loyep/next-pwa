"use client";
import { IconChevronRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";

import { TextBox, type TextBoxProps } from "@/components/TextBox.js";
import { clsx } from "@/utils/clsx.js";

interface SidebarClientProps {
  children: ReactNode;
}

const sidebarButtonClass = clsx(
  "z-20 w-full h-fit flex flex-row gap-2 items-center justify-start p-4 md:hidden",
  "bg-gray-100 duration-100 dark:bg-neutral-900 text-black dark:text-white "
);

const sidebarBaseClass = clsx(
  "overflow-y-auto overflow-x-hidden px-4 pb-4 md:pt-4 grow md:h-[calc(100vh-100px)]",
  "transform-gpu transition-all duration-150 ease-out",
  "bg-gray-100 dark:bg-neutral-900"
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

interface SidebarTextBoxProps extends TextBoxProps {
  hasChildTree: boolean;
  childTreeReactNode: ReactNode;
}

export const SidebarTextBox = ({
  href,
  children,
  hasChildTree,
  childTreeReactNode,
  ...rest
}: SidebarTextBoxProps) => {
  const pathname = usePathname();

  const [isChildOpened, setIsChildOpened] = useState(
    !!href && pathname.startsWith(href)
  );

  return (
    <>
      <TextBox
        href={href}
        onClick={() => hasChildTree && setIsChildOpened((_state) => !_state)}
        {...rest}
      >
        {children}
        {hasChildTree && (
          <IconChevronRight
            className={clsx(
              "text-gray-500 dark:text-neutral-400",
              "transition-all duration-100 rounded-sm",
              isChildOpened && "rotate-90"
            )}
            width={20}
            height={20}
            aria-hidden
          />
        )}
      </TextBox>
      {hasChildTree && isChildOpened && childTreeReactNode}
    </>
  );
};
