import path from "node:path";
import { fileURLToPath } from "node:url";

import fg from "fast-glob";
import type { NextConfig, NextConfigComplete, WebpackConfigContext } from "next/dist/server/config-shared.js";
import type { TsConfigJson } from "type-fest";
import type { Asset, Compilation, Configuration as WebpackConfig, default as Webpack } from "webpack";

import { loadTSConfig, logger, relativeToOutputPath } from "#utils/index.js";

import { RequireFields, WorkboxOptions } from "./private-types.js";
import type { PluginOptions } from "./types.js";
import { getFileHash } from "./utils.js";
import { getDefaultDocumentPage } from "./webpack/builders/get-default-document-page.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export interface PluginOptionsComplete extends Required<PluginOptions> {
  disable: false;
  workboxOptions: RequireFields<WorkboxOptions, "swDest" | "additionalManifestEntries" | "exclude" | "manifestTransforms">;
}

type PublicPath = NonNullable<NonNullable<WebpackConfig["output"]>["publicPath"]>;

export type NextPwaContext = {
  disabled: false;
  publicPath: PublicPath | undefined;
  nextConfig: NextConfigComplete;
  webpack: typeof Webpack;
  webpackContext: WebpackConfigContext;
  webpackConfig: WebpackConfig;
  tsConfig: TsConfigJson | undefined;
  userOptions: PluginOptions;
  options: PluginOptionsComplete;
};

export const parseOptions = (
  webpackContext: WebpackConfigContext,
  publicPath: PublicPath | undefined,
  nextConfig: NextConfigComplete,
  // For Workbox configurations:
  // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
  {
    disable = false,
    register = true,
    dest = "public",
    sw = "sw.js",
    cacheStartUrl = true,
    dynamicStartUrl = true,
    dynamicStartUrlRedirect = undefined!,
    publicExcludes = ["!noprecache/**/*"],
    fallbacks = {},
    cacheOnFrontEndNav = false,
    aggressiveFrontEndNavCaching = false,
    reloadOnOnline = true,
    scope = nextConfig.basePath,
    customWorkerSrc = "worker",
    customWorkerDest = dest,
    customWorkerPrefix = "worker",
    workboxOptions: {
      additionalManifestEntries,
      manifestTransforms: _manifestTransforms = [],
      exclude: _exclude = [/\/_next\/static\/.*(?<!\.p)\.woff2/, /\.map$/, /^manifest.*\.js$/],
      ...workbox
    } = {},
    extendDefaultRuntimeCaching = false,
  }: PluginOptions,
): PluginOptionsComplete | { disable: true } => {
  if (disable) return { disable };

  const publicDir = path.resolve(webpackContext.dir, "public");

  if (!additionalManifestEntries) {
    additionalManifestEntries = fg
      .sync(
        [
          "**/*",
          "!workbox-*.js",
          "!workbox-*.js.map",
          "!worker-*.js",
          "!worker-*.js.map",
          "!fallback-*.js",
          "!fallback-*.js.map",
          "!swe-worker-*.js",
          "!swe-worker-*.js.map",
          `!${sw.replace(/^\/+/, "")}`,
          `!${sw.replace(/^\/+/, "")}.map`,
          ...publicExcludes,
        ],
        {
          cwd: publicDir,
        },
      )
      .map((f) => ({
        url: path.posix.join(nextConfig.basePath, f),
        revision: getFileHash(path.resolve(publicDir, f)),
      }));
  }

  if (cacheStartUrl) {
    if (!dynamicStartUrl) {
      additionalManifestEntries.push({
        url: nextConfig.basePath,
        revision: webpackContext.buildId,
      });
    } else if (typeof dynamicStartUrlRedirect === "string" && dynamicStartUrlRedirect.length > 0) {
      additionalManifestEntries.push({
        url: dynamicStartUrlRedirect,
        revision: webpackContext.buildId,
      });
    }
  }

  const destDir = path.join(webpackContext.dir, dest);

  if (!path.isAbsolute(customWorkerSrc)) {
    customWorkerSrc = path.join(webpackContext.dir, customWorkerSrc);
  }

  if (fallbacks) {
    if (!fallbacks.document) {
      fallbacks.document = getDefaultDocumentPage(webpackContext.dir, nextConfig.pageExtensions);
    }
  }

  return {
    disable,
    register,
    dest: destDir,
    sw: path.posix.join(nextConfig.basePath, sw),
    cacheStartUrl,
    dynamicStartUrl,
    dynamicStartUrlRedirect,
    publicExcludes,
    fallbacks,

    cacheOnFrontEndNav,
    aggressiveFrontEndNavCaching,
    reloadOnOnline,
    scope: path.posix.join(scope, "/"),
    customWorkerSrc,
    customWorkerDest: path.resolve(webpackContext.dir, customWorkerDest),
    customWorkerPrefix,
    workboxOptions: {
      ...workbox,
      swDest: path.join(destDir, sw),
      additionalManifestEntries: webpackContext.dev ? [] : additionalManifestEntries,
      exclude: [
        ..._exclude,
        ({ asset }: { asset: Asset }) => {
          if (asset.name.startsWith("server/") || asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)) {
            return true;
          }
          if (webpackContext.dev && !asset.name.startsWith("static/runtime/")) {
            return true;
          }
          return false;
        },
      ],
      manifestTransforms: [
        ..._manifestTransforms,
        async (manifestEntries, compilation) => {
          // This path always uses forward slashes, so it is safe to use it in the following string replace.
          const publicDirRelativeOutput = relativeToOutputPath(compilation as Compilation, publicDir);
          // `publicPath` is always `${assetPrefix}/_next/` for Next.js apps.
          const publicFilesPrefix = `${publicPath}${publicDirRelativeOutput}`;
          const manifest = manifestEntries.map((m) => {
            m.url = m.url.replace("/_next//static/image", "/_next/static/image").replace("/_next//static/media", "/_next/static/media");

            // We remove `${publicPath}/${publicDirRelativeOutput}` because `assetPrefix`
            // is not intended for files that are in the public directory and we also want
            // to remove `/_next/${publicDirRelativeOutput}` from the URL, since that is not how
            // we resolve files in the public directory.
            if (m.url.startsWith(publicFilesPrefix)) {
              m.url = path.posix.join(nextConfig.basePath, m.url.replace(publicFilesPrefix, ""));
            }

            if (m.revision === null) {
              let key = m.url;
              if (typeof publicPath === "string" && key.startsWith(publicPath)) {
                key = m.url.substring(publicPath.length);
              }
              const asset = (compilation as any).assetsInfo.get(key);
              m.revision = asset ? asset.contenthash || webpackContext.buildId : webpackContext.buildId;
            }
            m.url = m.url.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
            return m;
          });
          return { manifest, warnings: [] };
        },
      ],
    },
    extendDefaultRuntimeCaching,
  } satisfies PluginOptionsComplete;
};

export const createContext = (
  webpack: typeof Webpack,
  options: WebpackConfigContext,
  userNextConfig: NextConfig,
  webpackConfig: WebpackConfig,
  userOptions: PluginOptions,
): NextPwaContext | { disabled: true; webpackConfig: WebpackConfig } => {
  // Do NOT use resolvedNextConfig here.
  // Its `webpack` function is the resulting function of calling all plugins,
  // including ours. Calling it will cause an infinitely recursive call.
  if (typeof userNextConfig.webpack === "function") {
    webpackConfig = userNextConfig.webpack(webpackConfig, options);
  }
  const resolvedNextConfig = {
    ...options.config,
    basePath: options.config.basePath || "/",
  } satisfies NextConfigComplete;
  const publicPath = webpackConfig.output?.publicPath;
  const resolvedOptions = parseOptions(options, publicPath, resolvedNextConfig, userOptions);
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }
  if (resolvedOptions.disable) {
    !options.isServer && logger.info("PWA support is disabled.");
    return {
      disabled: true,
      webpackConfig,
    };
  }
  const tsConfig = loadTSConfig(options.dir, resolvedNextConfig.typescript.tsconfigPath);
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      __PWA_SW__: `'${resolvedOptions.sw}'`,
      __PWA_SCOPE__: `'${resolvedOptions.scope}'`,
      __PWA_ENABLE_REGISTER__: `${Boolean(resolvedOptions.register)}`,
      __PWA_START_URL__: resolvedOptions.dynamicStartUrl ? `'${resolvedNextConfig.basePath}'` : undefined,
      __PWA_CACHE_ON_FRONT_END_NAV__: `${Boolean(resolvedOptions.cacheOnFrontEndNav)}`,
      __PWA_AGGRFEN_CACHE__: `${Boolean(resolvedOptions.aggressiveFrontEndNavCaching)}`,
      __PWA_RELOAD_ON_ONLINE__: `${Boolean(resolvedOptions.reloadOnOnline)}`,
    }),
  );
  const swEntryJs = path.join(__dirname, "sw-entry.js");
  const entry = webpackConfig.entry as () => Promise<Record<string, string[] | string>>;
  webpackConfig.entry = async () => {
    const entries = await entry();
    if (entries["main.js"] && !entries["main.js"].includes(swEntryJs)) {
      if (Array.isArray(entries["main.js"])) {
        entries["main.js"].unshift(swEntryJs);
      } else if (typeof entries["main.js"] === "string") {
        entries["main.js"] = [swEntryJs, entries["main.js"]];
      }
    }
    if (entries["main-app"] && !entries["main-app"].includes(swEntryJs)) {
      if (Array.isArray(entries["main-app"])) {
        entries["main-app"].unshift(swEntryJs);
      } else if (typeof entries["main-app"] === "string") {
        entries["main-app"] = [swEntryJs, entries["main-app"]];
      }
    }
    return entries;
  };
  return {
    disabled: false,
    publicPath,
    nextConfig: resolvedNextConfig,
    webpack,
    webpackContext: options,
    webpackConfig,
    tsConfig,
    userOptions,
    options: resolvedOptions,
  } satisfies NextPwaContext;
};
