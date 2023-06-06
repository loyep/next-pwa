# next-pwa - custom worker

This example demonstrates how to add some custom worker code to the generated service worker.

## Usage

[![Open in Gitpod and run](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/custom-worker
pnpm build
pnpm start
```

or

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

```bash
yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

```bash
pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker custom-worker-app
```

## Recommended `.gitignore`

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```
