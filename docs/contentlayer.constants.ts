import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { PluggableList } from "unified";

import rehypeSlug from "./md-plugins/sluggify.js";

export const rehypePlugins: PluggableList = [
  [
    rehypeSanitize,
    {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [
          ...(defaultSchema.attributes?.code || []),
          // List of all allowed languages:
          [
            "className",
            "language-js",
            "language-jsx",
            "language-ts",
            "language-tsx",
            "language-css",
            "language-md",
            "language-bash",
            "language-json",
          ],
        ],
      },
    },
  ],
  rehypeHighlight,
  rehypeSlug,
];

export const remarkPlugins: PluggableList = [];
