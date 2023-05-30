// Source (MIT): https://github.com/syntax-tree/mdast-util-toc
import type { List } from "mdast";

import { contents } from "./tocContents.js";
import { search } from "./tocSearch.js";
import { toExpression } from "./tocToExpression.js";
import type { Node, Options } from "./types.js";

/**
 * Results.
 */
interface Result {
  /**
   * Index of the node right after the table of contents heading, `-1` if no
   * heading was found, `null` if no `heading` was given.
   */
  index: number | null;
  /**
   *  Index of the first node after `heading` that is not part of its section,
   *  `-1` if no heading was found, `null` if no `heading` was given, same as
   *  `index` if there are no nodes between `heading` and the first heading in
   *  the table of contents.
   */
  endIndex: number | null;
  /**
   * List representing the generated table of contents, `null` if no table of
   * contents could be created, either because no heading was found or because
   * no following headings were found.
   */
  map: List | null;
}

/**
 * Generate a table of contents from `tree`.
 *
 * Looks for the first heading matching `options.heading` (case insensitive) and
 * returns a table of contents (a list) for all following headings.
 * If no `heading` is specified, creates a table of contents for all headings in
 * `tree`.
 * `tree` is not changed.
 *
 * Links in the list to headings are based on GitHub’s style.
 * Only top-level headings (those not in blockquotes or lists), are used.
 * This default behavior can be changed by passing `options.parents`.
 *
 * @param tree
 * @param options
 * @returns
 */
export const toc = (tree: Node, options: Options = {}): Result => {
  const heading = options.heading ? toExpression(options.heading) : undefined;
  const result = search(tree, heading, options);

  return {
    index: heading ? result.index : null,
    endIndex: heading ? result.endIndex : null,
    map: result.map.length > 0 ? contents(result.map, options) : null,
  };
};
