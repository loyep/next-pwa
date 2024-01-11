import path from "node:path";
import { fileURLToPath } from "node:url";

import webpack from "webpack";

import { NextPwaContext } from "../../context.js";
import type { FallbackRoutes } from "../../types.js";
import { getContentHash } from "../../utils.js";
import { ChildCompilationPlugin } from "../plugins/child-compilation-plugins.js";
import { getFallbackEnvs } from "./get-fallback-envs.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const buildFallbackWorker = (ctx: NextPwaContext) => {
  const fallbacks = Object.keys(ctx.options.fallbacks).reduce((obj, key) => {
    const value = ctx.options.fallbacks[key];
    if (value) {
      obj[key] = path.posix.join(ctx.nextConfig.basePath, value);
    }
    return obj;
  }, {} as FallbackRoutes);

  const envs = getFallbackEnvs({
    fallbacks,
    buildId: ctx.webpackContext.buildId,
  });

  if (!envs) {
    return undefined;
  }

  const fallbackJs = path.join(__dirname, "fallback.js");

  // We'd like to use webpack's `[hash]`, but we can't determine that hash without
  // Promise (Next doesn't allow Promise in webpack(config, context), but even if we
  // use Promise we will block the build until our stuff is done)
  const name = `fallback-${getContentHash(fallbackJs, ctx.webpackContext.dev)}.js`;

  return {
    name: path.posix.join(ctx.nextConfig.basePath, name),
    precaches: Object.values(envs).filter((v) => !!v),
    pluginInstance: new ChildCompilationPlugin({
      src: fallbackJs,
      dest: path.join(ctx.options.dest, name),
      plugins: [new webpack.EnvironmentPlugin(envs)],
    }),
  };
};
