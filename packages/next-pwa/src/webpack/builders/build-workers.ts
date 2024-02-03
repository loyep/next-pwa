import type { Configuration } from "webpack";

import { NextPwaContext } from "../../context.js";
import { buildCustomWorker } from "./build-custom-worker.js";
import { buildFallbackWorker } from "./build-fallback-worker.js";

export const buildWorkers = (ctx: NextPwaContext) => {
  const childCompilationInstances: NonNullable<Configuration["plugins"]> = [];

  const customWorker = buildCustomWorker(ctx);

  if (!ctx.options.workboxOptions.importScripts) ctx.options.workboxOptions.importScripts = [];

  if (customWorker !== undefined) {
    ctx.options.workboxOptions.importScripts.unshift(customWorker.name);
    childCompilationInstances.push(customWorker.pluginInstance);
  }

  let hasFallbacks = false;

  if (ctx.options.fallbacks) {
    const fallbackWorker = buildFallbackWorker(ctx);

    if (fallbackWorker) {
      hasFallbacks = true;
      ctx.options.workboxOptions.importScripts.unshift(fallbackWorker.name);
      childCompilationInstances.push(fallbackWorker.pluginInstance);

      if (!ctx.options.workboxOptions.additionalManifestEntries) {
        ctx.options.workboxOptions.additionalManifestEntries = [];
      }

      for (const route of fallbackWorker.precaches) {
        if (
          route &&
          typeof route !== "boolean" &&
          !ctx.options.workboxOptions.additionalManifestEntries.find((entry) => typeof entry === "object" && entry.url.startsWith(route))
        ) {
          ctx.options.workboxOptions.additionalManifestEntries.push({
            url: route,
            revision: ctx.webpackContext.buildId,
          });
        }
      }
    }
  }

  return {
    hasFallbacks,
    childCompilationInstances,
  };
};
