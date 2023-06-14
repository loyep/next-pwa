import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { clsx } from "@/utils/clsx.js";

export interface HeadingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  variant?: "default" | "error";
  type?: "subtitle" | "title" | "title-large" | "display";
  isInSatori?: boolean;
}

const mapTypeToComponent: Record<
  NonNullable<HeadingProps["type"]>,
  {
    element: ElementType;
    className?: string;
  }
> = {
  subtitle: {
    element: "h4",
    className: "font-semibold tracking-tight my-8 text-xl",
  },
  title: {
    element: "h3",
    className: "font-semibold tracking-tight my-8 text-2xl",
  },
  "title-large": {
    element: "h2",
    className: "font-semibold tracking-tight my-10 pb-1 text-3xl",
  },
  display: {
    element: "h1",
    className: "font-bold tracking-tight my-2 text-4xl",
  },
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ id, variant = "default", className, type = "title", ...rest }, ref) => {
    const mappedComponent = mapTypeToComponent[type];
    const Component = mappedComponent.element;
    return (
      <span
        className={twMerge(
          "group flex flex-row",
          mappedComponent.className,
          className
        )}
      >
        <Component
          ref={ref}
          id={id}
          className={clsx("break-words", {
            "text-black dark:text-white": variant === "default",
            "text-red-500 dark:text-red-400": variant === "error",
          })}
          {...rest}
        />
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 hidden text-slate-400 dark:text-slate-600 group-hover:inline group-active:inline group-focus:inline"
            aria-label="Permalink for this section"
          >
            #
          </a>
        )}
      </span>
    );
  }
);

Heading.displayName = "Heading";
