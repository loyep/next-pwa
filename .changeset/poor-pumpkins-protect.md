---
"@ducanh2912/next-pwa": patch
---

fix(core): fixed invalid precache manifest with `assetPrefix`

- Turns out it is much more complex than we thought. To make this work with `assetPrefix`, `distDir`, and `basePath`, we now remove `${publicPath}${publicDirRelativeToOutputPath}` from public files in `manifestTransforms` because `assetPrefix` is not intended for files that are in the public directory and we also want to remove `/_next/${publicDirRelativeToOutputPath}` from the URL, since that is not how we resolve files in the public directory.