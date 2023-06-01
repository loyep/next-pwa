import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { rehypePlugins, remarkPlugins } from "./contentlayer.constants.js";
import { generateToc } from "./contentlayer.utils.js";

const Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: ({ _raw: { flattenedPath } }) =>
        `/docs${flattenedPath === "" ? "" : `/${flattenedPath}`}`,
    },
    headings: {
      type: "string",
      resolve: (doc) => generateToc(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Docs],
  mdx: {
    rehypePlugins,
    remarkPlugins,
  },
});
