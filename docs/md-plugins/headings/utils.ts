import { toString } from "mdast-util-to-string";

export const getNodeAsString = (node: unknown) =>
  toString(node, { includeImageAlt: false });
