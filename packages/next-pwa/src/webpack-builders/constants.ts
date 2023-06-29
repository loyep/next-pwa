import type { MinimizerOptions, TerserOptions } from "terser-webpack-plugin";

export const TERSER_OPTIONS: MinimizerOptions<TerserOptions> = {
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
};
