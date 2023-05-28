import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  FC,
} from "react";
import { twMerge } from "tailwind-merge";

export interface NavLinkSkeletonsProps {
  parentProps?: ComponentPropsWithRef<"div">;
  skeletons: {
    additionalProps?: ComponentPropsWithoutRef<"div">;
    length: number;
    keyBase: string;
    label: string;
  };
}

export const NavLinkSkeletons: FC<NavLinkSkeletonsProps> = ({
  parentProps: { className: parentClassName, ...parentRest } = {},
  skeletons: {
    additionalProps: { className: skeletonClassName, ...skeletonProps } = {},
    keyBase: skeletonsKeyBase,
    label: skeletonsLabel,
    length: skeletonsLength = 0,
  },
}) => (
  <div
    className={twMerge("flex flex-row gap-[5px]", parentClassName)}
    aria-label={skeletonsLabel}
    aria-busy
    aria-live="polite"
    {...parentRest}
  >
    {Array.from({ length: skeletonsLength }, (_, idx) => (
      <div
        className={twMerge(
          "flex animate-pulse items-center rounded-md bg-gray-300 px-3 py-2 text-base font-medium dark:bg-slate-700 sm:justify-center sm:text-sm",
          skeletonClassName
        )}
        key={`${skeletonsKeyBase}-${idx}`}
        {...skeletonProps}
      >
        <p className="invisible">Skeleton</p>
      </div>
    ))}
  </div>
);
