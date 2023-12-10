import path from "node:path";
import { fileURLToPath } from "node:url";

import { getContentHash } from "../../utils.js";
import { ChildCompilationPlugin } from "../plugins/child-compilation-plugins.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const buildSWEntryWorker = ({
  isDev,
  destDir,
  shouldGenSWEWorker,
  basePath,
}: {
  isDev: boolean;
  destDir: string;
  shouldGenSWEWorker: boolean;
  basePath: string;
}) => {
  if (!shouldGenSWEWorker) {
    return undefined;
  }

  const swEntryWorkerEntry = path.join(__dirname, `sw-entry-worker.js`);

  // We'd like to use webpack's `[hash]`, but we can't determine that hash without
  // Promise (Next doesn't allow Promise in webpack(config, context), but even if we
  // use Promise we will block the build until our stuff is done)
  const name = `swe-worker-${getContentHash(swEntryWorkerEntry, isDev)}.js`;

  return {
    name: path.posix.join(basePath, name),
    pluginInstance: new ChildCompilationPlugin({
      src: swEntryWorkerEntry,
      dest: path.join(destDir, name),
    }),
  };
};
