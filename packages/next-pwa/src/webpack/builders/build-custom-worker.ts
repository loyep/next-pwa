import path from "node:path";

import fg from "fast-glob";

import { logger } from "$utils/index.js";

import { NextPwaContext } from "../../context.js";
import { getContentHash } from "../../utils.js";
import { ChildCompilationPlugin } from "../plugins/child-compilation-plugins.js";

export const buildCustomWorker = (ctx: NextPwaContext) => {
  const customWorkerEntries = fg.sync("{src/,}index.{ts,js}", {
    cwd: ctx.options.customWorkerSrc,
  });

  if (customWorkerEntries.length === 0) {
    return undefined;
  }

  const customWorkerEntry = path.join(ctx.options.customWorkerSrc, customWorkerEntries[0]);

  logger.event(`Found a custom worker implementation at ${customWorkerEntry}.`);

  // We'd like to use webpack's `[hash]`, but we can't determine that hash without
  // Promise (Next doesn't allow Promise in webpack(config, context), but even if we
  // use Promise we will block the build until our stuff is done)
  const name = `${ctx.options.customWorkerPrefix}-${getContentHash(customWorkerEntry, ctx.webpackContext.dev)}.js`;

  logger.event(`Building the custom worker to ${path.join(ctx.options.customWorkerDest, name)}...`);

  return {
    name: path.posix.join(ctx.nextConfig.basePath, name),
    pluginInstance: new ChildCompilationPlugin({
      src: customWorkerEntry,
      dest: path.join(ctx.options.customWorkerDest, name),
    }),
  };
};
