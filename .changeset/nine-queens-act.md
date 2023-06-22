---
"@ducanh2912/next-pwa": patch
---

fix(swc-loader): only log when both swc sources can't be resolved

- Previously, swc-loader used to always log "Using @swc/core to compile next-pwa's features. Please install it if you haven't." if `next/dist/build/swc` can't be resolved. This can get annoying, so this changes it so that it only logs when both sources can't be resolved.
