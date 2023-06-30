---
"@ducanh2912/next-pwa": patch
---

fix(next-pwa): fixed `@swc/core` not found

- This is due to our change to `terser-webpack-plugin`'s `TerserPlugin.swcMinify`, which tries to resolve `@swc/core`. It is not installed by default in our case.
