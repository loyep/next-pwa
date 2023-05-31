import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { clsx } from "@/utils/clsx.js";

export interface TextProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  variant?: "default" | "error";
}

/**
 * Simple Text component that supports dark mode.
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "default", className, ...rest }, ref) => (
    <p
      className={twMerge(
        clsx("break-words", {
          "text-black dark:text-white": variant === "default",
          "text-red-500 dark:text-red-400": variant === "error",
        }),
        className
      )}
      ref={ref}
      {...rest}
    />
  )
);

Text.displayName = "Text";
