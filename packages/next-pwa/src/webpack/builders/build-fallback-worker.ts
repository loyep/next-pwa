import path from "node:path";
import { fileURLToPath } from "node:url";

import webpack from "webpack";

import type { FallbackRoutes } from "../../types.js";
import { getContentHash } from "../../utils.js";
import { ChildCompilationPlugin } from "../plugins/child-compilation-plugins.js";
import { getFallbackEnvs } from "./get-fallback-envs.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const buildFallbackWorker = ({
  isDev,
  buildId,
  fallbacks,
  destDir,
  basePath,
}: {
  isDev: boolean;
  buildId: string;
  fallbacks: FallbackRoutes;
  destDir: string;
  basePath: string;
}) => {
  fallbacks = Object.keys(fallbacks).reduce((obj, key) => {
    const value = fallbacks[key];
    if (value) {
      obj[key] = path.posix.join(basePath, value);
    }
    return obj;
  }, {} as FallbackRoutes);

  const envs = getFallbackEnvs({
    fallbacks,
    buildId,
  });

  if (!envs) {
    return undefined;
  }

  const fallbackJs = path.join(__dirname, `fallback.js`);

  // We'd like to use webpack's `[hash]`, but we can't determine that hash without
  // Promise (Next doesn't allow Promise in webpack(config, context), but even if we
  // use Promise we will block the build until our stuff is done)
  const name = `fallback-${getContentHash(fallbackJs, isDev)}.js`;

  return {
    name: path.posix.join(basePath, name),
    precaches: Object.values(envs).filter((v) => !!v),
    pluginInstance: new ChildCompilationPlugin({
      src: fallbackJs,
      dest: path.join(destDir, name),
      plugins: [new webpack.EnvironmentPlugin(envs)],
    }),
  };
};
