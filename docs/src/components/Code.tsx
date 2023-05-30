import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ className, ...rest }, ref) => (
    <code
      className={twMerge(
        "my-6 rounded-md break-words py-0.5 px-[.25em] text-[.9em]",
        "border-black border-opacity-[0.04] border dark:border-white/10",
        className
      )}
      dir="ltr"
      ref={ref}
      {...rest}
    />
  )
);

Code.displayName = "Code";
