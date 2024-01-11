import path from "node:path";

import type { RuntimeCaching } from "workbox-build";
import WorkboxPlugin from "workbox-webpack-plugin";

import { logger } from "$utils/index.js";

import { NextPwaContext } from "./context.js";
import { resolveRuntimeCaching } from "./resolve-runtime-caching.js";
import { isInjectManifestConfig, overrideAfterCalledMethod } from "./utils.js";
import { buildWorkers } from "./webpack/builders/build-workers.js";

export const resolveWorkboxPlugin = (ctx: NextPwaContext) => {
  if (isInjectManifestConfig(ctx.options.workboxOptions)) {
    const swSrc = path.join(ctx.webpackContext.dir, ctx.options.workboxOptions.swSrc);
    logger.event(`Using InjectManifest with ${swSrc}`);
    const workboxPlugin = new WorkboxPlugin.InjectManifest({
      ...ctx.options.workboxOptions,
      swSrc,
    });
    if (ctx.webpackContext.dev) {
      overrideAfterCalledMethod(workboxPlugin);
    }
    return [workboxPlugin];
  }
  const { hasFallbacks, childCompilationInstances } = buildWorkers(ctx);
  const {
    skipWaiting = true,
    clientsClaim = true,
    cleanupOutdatedCaches = true,
    ignoreURLParametersMatching = [/^utm_/, /^fbclid$/],
    importScripts,
    runtimeCaching: userRuntimeCaching,
    ...workbox
  } = ctx.options.workboxOptions;

  let runtimeCaching: RuntimeCaching[];

  let shutWorkboxAfterCalledUp = false;

  if (ctx.webpackContext.dev) {
    logger.info(
      "Building in development mode, caching and precaching are disabled for the most part. This means that offline support is disabled, " +
        "but you can continue developing other functions in service worker.",
    );
    ignoreURLParametersMatching.push(/ts/);
    runtimeCaching = [
      {
        urlPattern: /.*/i,
        handler: "NetworkOnly",
        options: {
          cacheName: "dev",
        },
      },
    ];
    shutWorkboxAfterCalledUp = true;
  } else {
    runtimeCaching = resolveRuntimeCaching(userRuntimeCaching, ctx.options.extendDefaultRuntimeCaching);
  }

  if (ctx.options.dynamicStartUrl) {
    runtimeCaching.unshift({
      urlPattern: ctx.nextConfig.basePath,
      handler: "NetworkFirst",
      options: {
        cacheName: "start-url",
        plugins: [
          {
            async cacheWillUpdate({ response }) {
              if (response && response.type === "opaqueredirect") {
                return new Response(response.body, {
                  status: 200,
                  statusText: "OK",
                  headers: response.headers,
                });
              }
              return response;
            },
          },
        ],
      },
    });
  }

  if (hasFallbacks) {
    runtimeCaching.forEach((cacheEntry) => {
      if (!cacheEntry.options || cacheEntry.options.precacheFallback || cacheEntry.options.plugins?.find((plugin) => "handlerDidError" in plugin)) {
        return;
      }

      if (!cacheEntry.options.plugins) {
        cacheEntry.options.plugins = [];
      }

      cacheEntry.options.plugins.push({
        async handlerDidError({ request }) {
          if (typeof self !== "undefined") {
            return self.fallback(request);
          }
          return Response.error();
        },
      });
    });
  }

  const workboxPlugin = new WorkboxPlugin.GenerateSW({
    ...workbox,
    skipWaiting,
    clientsClaim,
    cleanupOutdatedCaches,
    ignoreURLParametersMatching,
    importScripts,
    runtimeCaching,
  });

  if (shutWorkboxAfterCalledUp) {
    overrideAfterCalledMethod(workboxPlugin);
  }

  return [workboxPlugin, ...childCompilationInstances];
};
