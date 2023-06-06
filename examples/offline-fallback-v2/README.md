# next-pwa - offline fallback

This example demonstrates how to use `next-pwa` to implement fallback route, image or font when fetching fails. Fetching errors usually happen when the user is **offline**. (Note: fetching is regarded as successful even when the server returns error status codes like `404, 400, 500, ...`)

## Usage

[![Open in Gitpod and run](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/offline-fallback-v2
pnpm build
pnpm start
```

or

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2 offline-fallback-app
```

## Recommended `.gitignore`

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/fallback-*.js
```
