import type { JsMinifyOptions, TerserCompressOptions } from "@swc/core";
import type {
  CustomOptions,
  Input,
  MinimizedResult,
  PredefinedOptions,
  SourceMapInput,
} from "terser-webpack-plugin";

import type { resolveSwc as swcResolver } from "./resolve-swc.js";

/**
 * Custom `terser-webpack-plugin` minifier (with `@swc/core`).
 * @param input
 * @param sourceMap
 * @param minimizerOptions
 * @return
 */
export const swcMinify = async (
  input: Input,
  sourceMap: SourceMapInput | undefined,
  options: PredefinedOptions & CustomOptions
): Promise<MinimizedResult> => {
  const { resolveSwc, ...minimizerOptions } = options;

  const buildSwcOptions = (
    swcOptions: PredefinedOptions & JsMinifyOptions
  ): JsMinifyOptions & {
    sourceMap: boolean | undefined;
    compress: TerserCompressOptions;
  } => {
    return {
      ...swcOptions,
      compress:
        typeof swcOptions.compress === "boolean"
          ? swcOptions.compress
            ? {}
            : false
          : { ...swcOptions.compress },
      mangle:
        swcOptions.mangle == null
          ? true
          : typeof swcOptions.mangle === "boolean"
          ? swcOptions.mangle
          : { ...swcOptions.mangle },
      sourceMap: undefined,
    };
  };

  const swc = resolveSwc() as ReturnType<typeof swcResolver>;
  // Copy `swc` options
  const swcOptions = buildSwcOptions(minimizerOptions);

  // Let `swc` generate a SourceMap
  if (sourceMap) {
    swcOptions.sourceMap = true;
  }

  if (swcOptions.compress) {
    // More optimizations
    if (typeof swcOptions.compress.ecma === "undefined") {
      swcOptions.compress.ecma = swcOptions.ecma;
    }

    if (
      swcOptions.ecma === 5 &&
      typeof swcOptions.compress.arrows === "undefined"
    ) {
      swcOptions.compress.arrows = false;
    }
  }

  const [[filename, code]] = Object.entries(input);
  const result = await swc.minify(code, swcOptions);

  let map;

  if (result.map) {
    map = JSON.parse(result.map);

    // TODO workaround for swc because `filename` is not preset as in `swc` signature as for `terser`
    map.sources = [filename];

    delete map.sourcesContent;
  }

  return {
    code: result.code,
    map,
  };
};