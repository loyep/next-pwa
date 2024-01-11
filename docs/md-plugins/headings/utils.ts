// biome-ignore lint/suspicious/noShadowRestrictedNames: Idk ask mdast
import { toString } from "mdast-util-to-string";

export const getNodeAsString = (node: unknown) => toString(node, { includeImageAlt: false });
