import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { linkUnderlineClassName } from "./classNames.js";

type LinkProps = Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "ref"
>;

/**
 * next/link, but with underline.
 */
export const AnchorLinkUnderline = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...rest }, ref) => (
    <a
      className={twMerge(linkUnderlineClassName, className)}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      {...rest}
    />
  )
);

AnchorLinkUnderline.displayName = "AnchorLink";
