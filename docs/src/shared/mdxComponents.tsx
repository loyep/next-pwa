import "highlight.js/styles/github-dark.css";

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { LegacyRef } from "react";
import { twMerge } from "tailwind-merge";

import { Callout } from "@/components/Callout.js";
import { Heading } from "@/components/Heading.js";
import { Text } from "@/components/Text.js";
import { clsx } from "@/utils/clsx.js";

const TEXT_COLOR = "text-black dark:text-white";
const TEXT_BORDER =
  "border-b border-neutral-200/70 contrast-more:border-neutral-400 dark:border-neutral-400/10 contrast-more:dark:border-neutral-400";

const filterLegacyRef = <T,>(ref: LegacyRef<T> | undefined) =>
  typeof ref === "string" ? undefined : ref;

export const mdxComponents: MDXComponents = {
  Callout,
  a: ({ className, href, ref, ...rest }) => {
    const resolvedClassName = twMerge("text-blue-500 underline", className);
    const isSameLink = href && (href.startsWith("/") || href.startsWith("#"));
    if (isSameLink) {
      return (
        <Link
          href={href}
          className={resolvedClassName}
          ref={filterLegacyRef(ref)}
          {...rest}
        />
      );
    }
    return (
      <a
        href={href}
        className={resolvedClassName}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        {...rest}
      />
    );
  },
  p: ({ ref, ...rest }) => <Text ref={filterLegacyRef(ref)} {...rest} />,
  h1: ({ ref, ...rest }) => (
    <Heading type="display" ref={filterLegacyRef(ref)} {...rest} />
  ),
  h2: ({ className, ref, ...rest }) => (
    <Heading
      type="title-large"
      ref={filterLegacyRef(ref)}
      className={clsx(TEXT_BORDER, className)}
      {...rest}
    />
  ),
  h3: ({ ref, ...rest }) => (
    <Heading type="title" ref={filterLegacyRef(ref)} {...rest} />
  ),
  h4: ({ ref, ...rest }) => (
    <Heading type="subtitle" ref={filterLegacyRef(ref)} {...rest} />
  ),
  code: ({ className, ...rest }) => (
    <code
      className={twMerge(
        "my-6 rounded-md break-words py-0.5 px-[.25em] text-[.9em]",
        "border-black border-opacity-[0.04] border dark:border-white/10",
        className
      )}
      dir="ltr"
      {...rest}
    />
  ),
  ul: ({ className, ...rest }) => (
    <ul
      className={twMerge(
        "mt-6 list-disc first:mt-0 ltr:ml-6 rtl:mr-6",
        className
      )}
      {...rest}
    />
  ),
  li: ({ className, ...rest }) => (
    <li
      className={twMerge("my-2 [&>ul]:pl-4", TEXT_COLOR, className)}
      {...rest}
    />
  ),
};
