// @ts-check
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "https://example.com",
  basePath: "/next-pwa",
};

export default withPWA(nextConfig);
