import path from "node:path";

import type { Configuration } from "webpack";
import type { ManifestEntry } from "workbox-build";

import type { NextBuildInfo } from "../../private-types.js";
import type { PluginOptions } from "../../types.js";
import { buildCustomWorker } from "./build-custom-worker.js";
import { buildFallbackWorker } from "./build-fallback-worker.js";
import { getDefaultDocumentPage } from "./get-default-document-page.js";

export interface BuildWorkersOptions
  extends Required<
    Pick<
      PluginOptions,
      | "customWorkerSrc"
      | "customWorkerDest"
      | "customWorkerPrefix"
      | "fallbacks"
    >
  > {}

interface BuildWorkersCompleteOptions
  extends BuildWorkersOptions,
    Pick<
      NextBuildInfo,
      | "rootDir"
      | "destDir"
      | "basePath"
      | "buildId"
      | "pageExtensions"
      | "isDev"
      | "isAppDirEnabled"
    > {}

export const buildWorkers = ({
  rootDir,
  destDir,
  basePath,
  buildId,
  pageExtensions,
  isDev,
  isAppDirEnabled,

  customWorkerSrc,
  customWorkerDest,
  customWorkerPrefix,
  fallbacks,
}: BuildWorkersCompleteOptions) => {
  const importScripts: string[] = [];
  const additionalManifestEntries: ManifestEntry[] = [];
  const childCompilationInstances: NonNullable<Configuration["plugins"]> = [];

  const cwDest = path.join(rootDir, customWorkerDest);

  const customWorker = buildCustomWorker({
    isDev,
    rootDir,
    customWorkerSrc,
    customWorkerDest: cwDest,
    customWorkerPrefix,
    basePath,
  });

  if (customWorker !== undefined) {
    importScripts.unshift(customWorker.name);
    childCompilationInstances.push(customWorker.pluginInstance);
  }

  let hasFallbacks = false;

  if (fallbacks) {
    if (!fallbacks.document) {
      fallbacks.document = getDefaultDocumentPage(
        rootDir,
        pageExtensions,
        isAppDirEnabled
      );
    }
    const fallbackWorker = buildFallbackWorker({
      isDev,
      buildId,
      fallbacks,
      destDir,
      basePath,
    });

    if (fallbackWorker) {
      hasFallbacks = true;
      importScripts.unshift(fallbackWorker.name);
      childCompilationInstances.push(fallbackWorker.pluginInstance);

      fallbackWorker.precaches.forEach((route) => {
        if (
          route &&
          typeof route !== "boolean" &&
          !additionalManifestEntries.find(
            (entry) => typeof entry !== "string" && entry.url.startsWith(route)
          )
        ) {
          additionalManifestEntries.push({
            url: route,
            revision: buildId,
          });
        }
      });
    }
  }

  return {
    importScripts,
    hasFallbacks,
    additionalManifestEntries,
    childCompilationInstances,
  };
};
