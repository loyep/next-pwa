---
"@ducanh2912/next-pwa": patch
---

fix(next-pwa,compatibility): remove `node:` protocol from imports

- We currently don't have a clear version requirement for Node.js, and as such we should support as many versions as possible. It seems that only Node.js 16 and later support `node:` protocol imports for CJS, so we remove this protocol by using `@rollup/plugin-alias`. This compatibility patch might be removed in the future though.
