import type { Root } from "mdast";
import { mdxToMarkdown } from "mdast-util-mdx";
import { toMarkdown } from "mdast-util-to-markdown";
import { bundleMDX } from "mdx-bundler";

import { rehypePlugins, remarkPlugins } from "./contentlayer.constants.js";
import { toc } from "./md-plugins/toc/index.js";

export const generateToc = async (markdownContent: string) => {
  let headings = "";

  // Compile the tree to get the ToC.
  await bundleMDX({
    source: markdownContent,
    mdxOptions(opts) {
      opts.rehypePlugins = [...(opts.rehypePlugins ?? []), ...rehypePlugins];
      opts.remarkPlugins = [
        ...(opts.remarkPlugins ?? []),
        ...remarkPlugins,
        () => {
          return (node: Root) => {
            // Both mdast-util-toc and rehype-slug uses github-slugger, so we can trust
            // this.
            const result = toc(node);

            if (!result.map) {
              return;
            }

            headings = toMarkdown(result.map, {
              extensions: [mdxToMarkdown()],
            });
          };
        },
      ];
      return opts;
    },
  });

  // Compile the ToC from MDX to JS so that we can use it.
  return (
    await bundleMDX({
      source: headings,
      mdxOptions(opts) {
        opts.rehypePlugins = [...(opts.rehypePlugins ?? []), ...rehypePlugins];
        opts.remarkPlugins = [...(opts.remarkPlugins ?? []), ...remarkPlugins];
        return opts;
      },
    })
  ).code;
};
