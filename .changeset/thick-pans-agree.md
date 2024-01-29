---
"@ducanh2912/next-pwa": patch
---

fix(core): fixed invalid precache manifest and scope with `basePath`

- A fast backport of https://github.com/serwist/serwist/pull/56.
- This is caused by "/\_next/../public" in modifyURLPrefix not being matched when basePath is set, since the URL is actually "${basePath}/\_next/../public/\*\*/\*". We now use `manifestTransforms` instead of `modifyURLPrefix`.
- Also, with the refactor to using a context, we mistakenly changed `scope` from "${scope}" (suffixed with / if originally not) to "${basePath}/${scope}". This reverts that change. Sorry for the inconvenience!
