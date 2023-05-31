import NextLink from "next/link";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { linkUnderlineClassName } from "./classNames.js";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>;

/**
 * `next/link`, but with underline.
 */
export const LinkUnderline = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...rest }, ref) => (
    <NextLink
      className={twMerge(linkUnderlineClassName, className)}
      ref={ref}
      {...rest}
    />
  )
);

LinkUnderline.displayName = "Link";
