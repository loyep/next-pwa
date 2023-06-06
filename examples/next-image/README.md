# next-pwa - next/image

This example demonstrates best practices to serve your images through Next's built-in image feature.

For best performance, put images in its own folder rather than `public`. This will prevent duplicated precaching entries in the service worker script. Then use the `Image` component provided by Next in your app.

## Usage

[![Open in Gitpod and run](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/next-image
pnpm build
pnpm start
```

or

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-image next-image-app
```

## Recommended `.gitignore`

```gitignore
**/public/workbox-*.js
**/public/sw.js
```
