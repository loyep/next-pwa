import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { clsx } from "@/utils/clsx.js";

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  variant?: "default" | "error";
}

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
