import type { MinimizerOptions, TerserOptions } from "terser-webpack-plugin";
import { resolveSwc } from "utils";

export const TERSER_OPTIONS: MinimizerOptions<TerserOptions> & {
  resolveSwc: typeof resolveSwc;
} = {
  compress: {
    ecma: 5,
    comparisons: false,
    inline: 2,
  },
  mangle: {
    safari10: true,
  },
  format: {
    ecma: 5,
    safari10: true,
    comments: false,
    ascii_only: true,
  },
  resolveSwc,
};
