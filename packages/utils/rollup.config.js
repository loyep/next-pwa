// @ts-check
/**
 * @typedef {Pick<
 *   import("rollup").RollupOptions,
 *   "input" | "output" | "external" | "plugins"
 * >} FileEntry
 */
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import { defineConfig } from "rollup";

/** @type {FileEntry[]} */
const files = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
      },
    ],
    external: ["semver", "chalk"],
  },
];

export default files.map(({ input, output, external, plugins }) =>
  defineConfig({
    input,
    output,
    external,
    plugins: [
      nodeResolve({
        exportConditions: ["node"],
        extensions: [".js", ".ts"],
      }),
      swc({
        swc: {
          module: {
            type: "nodenext",
            lazy: true,
            importInterop: "swc",
          },
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: false,
              dynamicImport: true,
              decorators: false,
            },
            transform: {
              react: undefined,
            },
            target: "esnext",
            loose: false,
          },
          minify: true,
        },
      }),
      ...[plugins ?? []],
    ],
  })
);
