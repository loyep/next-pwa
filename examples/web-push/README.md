# next-pwa - web push

This example demonstrates how to use `next-pwa` to implement web push using a custom worker.

**NOTE**

In a real world application, you may want to send the subscription data to your server once the user agrees to subscribe to web push. Store the data associated with the user, so that you can initiate a web push notification from your server to that very user.

## Usage

1. Init the project

   [![Open in Gitpod and run](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

   ```bash
   cd examples/web-push
   ```

   or

   Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

   ```bash
   npx create-next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
   yarn create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
   pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/web-push web-push-app
   ```

1. Run

   ```bash
   pnpm vapid
   ```

1. Create a `.env` file, and put the public key generated from the previous steps

   ```shell
   WEB_PUSH_EMAIL=user@example.com
   WEB_PUSH_PRIVATE_KEY=<vapid-private-key>
   NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=<vapid-public-key>
   ```

1. Build and start

   ```bash
   pnpm build
   pnpm start
   ```

## Recommended `.gitignore`

```gitignore
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```
