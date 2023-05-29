import type { Content, Heading, PhrasingContent, Root } from "mdast";
import type { Test } from "unist-util-is";

export type Rank = Heading["depth"];
export type Node = Root | Content;

/**
 * Search configuration.
 */
export interface SearchOptions {
  /**
   * Maximum heading depth to include in the table of contents.
   *
   * This is inclusive: when set to `3`, level three headings are included
   * (those with three hashes, `###`).
   */
  maxDepth?: Rank;
  /**
   * Headings to skip, wrapped in `new RegExp('^(' + value + ')$', 'i')`.
   *
   * Any heading matching this expression will not be present in the table of
   * contents.
   */
  skip?: string;
  /**
   * Allow headings to be children of certain node types (default: the to `toc`
   * given `tree`, to only allow top-level headings).
   *
   * Internally, uses `unist-util-is` to check, so `parents` can be any
   * `is`-compatible test.
   */
  parents?: Test;
}

export interface SearchEntry {
  id: string;
  children: PhrasingContent[];
  depth: Rank;
}

export interface SearchResult {
  index: number;
  endIndex: number;
  map: SearchEntry[];
}

/**
 * Build configuration.
 */
export interface ContentsOptions {
  /**
   * Whether to compile list items tightly.
   */
  tight?: boolean;
  /**
   * Whether to compile list items as an ordered list, otherwise they are
   * unordered.
   */
  ordered?: boolean;
}

export interface ExtraOptions {
  /**
   * Heading to look for, wrapped in `new RegExp('^(' + value + ')$', 'i')`.
   */
  heading?: string | null;
}

export type Options = SearchOptions & ContentsOptions & ExtraOptions;
