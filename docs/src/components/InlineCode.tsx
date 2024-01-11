import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InlineCodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const InlineCode = ({ className, ...rest }: InlineCodeProps) => (
  <code
    className={twMerge(
      "my-6 break-words rounded-md px-[.25em] py-0.5 text-[.9em]",
      "border border-black border-opacity-[0.1] dark:border-white/10 dark:border-opacity-[0.04]",
      className,
    )}
    dir="ltr"
    {...rest}
  />
);
