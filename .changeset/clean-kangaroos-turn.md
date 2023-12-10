---
"@ducanh2912/next-pwa": major
---

chore(backporting): backported some changes from `@serwist/next@8.0.0`

- Removed `buildExcludes`.
  - Simply use `workboxOptions.exclude` as a replacement.
- Removed `customWorkerDir`.
  - Use `customWorkerSrc` instead.
- Removed `browserslist`, `swcMinify`, `watchWorkersInDev`.
  - We now create child compilers on Next.js's compiler instead of starting separate Webpack processes.
  - This also means you don't need to have `@swc/core` installed anymore.
- Change the default value for `dest` from `".next"` to `"public"`.
  - You should change it to `".next"` in your project if there's demand, but I'd recommend using `"public"` instead.
- Fixed the custom worker and the fallback worker not working...
  - I'm seriously sorry... This was caused by `next-pwa`'s `importScripts` not being passed to Workbox.
- Moved the minimum supported Next.js version from 11.0.0 to 14.0.0.
  - This is to remove the appDir check.
