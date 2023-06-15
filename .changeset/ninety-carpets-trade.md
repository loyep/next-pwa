---
"@ducanh2912/next-pwa": minor
---

feat(next-pwa, experimental): aggressiveFrontEndNavCaching

- This feature, combined with `cacheFrontEndNav`, will cache `<link rel="stylesheet" href="" />` and `<script src="" />` on frontend navigation. This allows
  pages which have only been visited through that method to work offline when directly visited.

- Frontend navigation caching has also been offloaded to a separate worker with this feature.
