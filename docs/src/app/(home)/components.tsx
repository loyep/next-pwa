import type { ReactNode } from "react";

import { clsx } from "@/utils/clsx.js";

export const CodeShowcase = ({
  children,
  invert,
}: {
  children: ReactNode[];
  invert: boolean;
}) => {
  const [code, ...others] = children;
  return (
    <div className="flex w-full flex-col gap-4 py-4 md:flex-row md:gap-24 md:py-10">
      <div className={clsx(invert && "md:order-last", "overflow-hidden md:flex-[3_3_0] [&>span]:mt-0")}>{others}</div>
      <div className="overflow-hidden md:flex-[2_2_0]">{code}</div>
    </div>
  );
};
