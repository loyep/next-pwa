import type { PluggableList } from "unified";

import rehypeSlug from "./md-plugins/headings/sluggify.js";

export const rehypePlugins: PluggableList = [rehypeSlug];

export const remarkPlugins: PluggableList = [];
