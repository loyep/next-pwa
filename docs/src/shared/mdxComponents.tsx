import "highlight.js/styles/github-dark.css";

import type { MDXComponents } from "mdx/types";
import { twMerge } from "tailwind-merge";

const TEXT_COLOR = "text-black dark:text-white";
const TEXT_BORDER =
  "border-b border-neutral-200/70 contrast-more:border-neutral-400 dark:border-neutral-400/10 contrast-more:dark:border-neutral-400";

export const mdxComponents: MDXComponents = {
  a: ({ className, href, ...rest }) => {
    const resolvedClassName = twMerge("text-blue-500 underline", className);
    const isSameLink = href && (href.startsWith("/") || href.startsWith("#"));
    return (
      <a
        href={href}
        className={resolvedClassName}
        {...(!isSameLink && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        {...rest}
      />
    );
  },
  p: ({ className, ...rest }) => (
    <p className={twMerge(TEXT_COLOR, className)} {...rest} />
  ),
  h1: ({ className, ...rest }) => (
    <h1
      className={twMerge(
        "mt-2 text-4xl font-bold tracking-tight",
        TEXT_COLOR,
        className
      )}
      {...rest}
    />
  ),
  h2: ({ className, ...rest }) => (
    <h2
      className={twMerge(
        "font-semibold tracking-tight mt-10 pb-1 text-3xl",
        TEXT_COLOR,
        TEXT_BORDER,
        className
      )}
      {...rest}
    />
  ),
  h3: ({ className, ...rest }) => (
    <h3
      className={twMerge(
        "font-semibold tracking-tight mt-8 text-2xl",
        TEXT_COLOR,
        className
      )}
      {...rest}
    />
  ),
  h4: ({ className, ...rest }) => (
    <h4
      className={twMerge(
        "font-semibold tracking-tight mt-8 text-xl",
        TEXT_COLOR,
        className
      )}
      {...rest}
    />
  ),
  code: ({ className, ...rest }) => (
    <code className={twMerge("my-2 rounded-md", className)} {...rest} />
  ),
  ul: ({ className, ...rest }) => (
    <ul className={twMerge("list-inside list-disc", className)} {...rest} />
  ),
  li: ({ className, ...rest }) => (
    <li className={twMerge("[&>ul]:pl-4", className)} {...rest} />
  ),
};
