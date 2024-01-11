---
"@ducanh2912/next-pwa": patch
---

fix(mjs): fixed the ESM build crashing

- This was due to us referencing `__dirname`, which was `undefined` in the ESM build...
