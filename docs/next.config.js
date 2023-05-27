// @ts-check
/**
 * @typedef {import("next").NextConfig} NextConfig
 * @typedef {((config?: NextConfig | undefined) => NextConfig) | ((config: NextConfig) => NextConfig)} NextConfigPlugin
 */
import withPWAInit from "@ducanh2912/next-pwa";
import withNextraInit from "nextra";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const withNextra = withNextraInit({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

/** @type {NextConfigPlugin[]} */
const plugins = [withPWA, withNextra];

/**
 * @type {(
 *     phase: string,
 *     { defaultConfig }: { defaultConfig: NextConfig },
 * ) => NextConfig}
 */
const nextComposePlugins = () =>
  plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

export default nextComposePlugins;
