import path from "node:path";

import fg from "fast-glob";

import { logger } from "$utils/index.js";

import { getContentHash } from "../../utils.js";
import { ChildCompilationPlugin } from "../plugins/child-compilation-plugins.js";

export const buildCustomWorker = ({
  isDev,
  rootDir,
  customWorkerSrc,
  customWorkerDest,
  customWorkerPrefix,
  basePath,
}: {
  isDev: boolean;
  rootDir: string;
  customWorkerSrc: string;
  customWorkerDest: string;
  customWorkerPrefix: string;
  basePath: string;
}) => {
  const customWorkerEntries = fg.sync("{src/,}index.{ts,js}", {
    cwd: customWorkerSrc,
  });

  if (customWorkerEntries.length === 0) {
    return undefined;
  }

  if (!path.isAbsolute(customWorkerSrc)) {
    customWorkerSrc = path.join(rootDir, customWorkerSrc);
  }

  const customWorkerEntry = path.join(customWorkerSrc, customWorkerEntries[0]);

  logger.event(`Found a custom worker implementation at ${customWorkerEntry}.`);

  // We'd like to use webpack's `[hash]`, but we can't determine that hash without
  // Promise (Next doesn't allow Promise in webpack(config, context), but even if we
  // use Promise we will block the build until our stuff is done)
  const name = `${customWorkerPrefix}-${getContentHash(
    customWorkerEntry,
    isDev
  )}.js`;

  logger.event(
    `Building the custom worker to ${path.join(customWorkerDest, name)}...`
  );

  return {
    name: path.posix.join(basePath, name),
    pluginInstance: new ChildCompilationPlugin({
      src: customWorkerEntry,
      dest: path.join(customWorkerDest, name),
    }),
  };
};
