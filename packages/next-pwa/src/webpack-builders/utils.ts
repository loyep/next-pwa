import path from "node:path";
import { fileURLToPath } from "node:url";

import TerserPlugin from "terser-webpack-plugin";
import { swcMinify } from "utils";
import type { Configuration } from "webpack";

import defaultSwcRc from "../.swcrc.json";
import { TERSER_OPTIONS } from "./constants.js";
import { NextPWAContext } from "./context.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const getSharedWebpackConfig = ({
  swcRc = defaultSwcRc,
}: {
  swcRc?: Record<string, any>;
}): Configuration => {
  const optimization = NextPWAContext.shouldMinify && {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: NextPWAContext.useSwcMinify
          ? swcMinify
          : TerserPlugin.terserMinify,
        terserOptions: TERSER_OPTIONS,
      }),
    ],
  };
  return {
    resolve: {
      extensions: [".js", ".ts"],
      fallback: {
        module: false,
        dgram: false,
        dns: false,
        path: false,
        fs: false,
        os: false,
        crypto: false,
        stream: false,
        http2: false,
        net: false,
        tls: false,
        zlib: false,
        child_process: false,
      },
    },
    resolveLoader: {
      alias: {
        "swc-loader": path.join(__dirname, "swc-loader.cjs"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)s$/i,
          use: [
            {
              loader: "swc-loader",
              options: swcRc,
            },
          ],
        },
      ],
    },
    optimization: optimization || undefined,
  };
};
