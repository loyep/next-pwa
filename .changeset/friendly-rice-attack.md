---
"@ducanh2912/next-pwa": patch
---

fix(next-pwa): fixed swc-minify crashing build when all swc sources can't be resolved

- The new behaviour should now be using `terser-webpack-plugin`'s `terserMinify` when they can't be found.
