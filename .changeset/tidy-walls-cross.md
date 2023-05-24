---
"@ducanh2912/next-pwa": minor
---

feat(next-pwa): added support for extending the default `runtimeCaching` array

- To use this feature you can add `extendDefaultRuntimeCaching` to your configuration.

- This feature helps you easily extend the default `runtimeCaching` array without having to copy the whole thing to your config. Your `runtimeCaching` have priority over the default runtime caching array, so its entries will override the default `runtimeCaching`'s entries should any of them share `cacheName`.
