---
"@ducanh2912/next-pwa": minor
---

refactor(core): create a context

- We now leverage a context to share the user's options for Webpack, Next.js, `next-pwa`, TypeScript, etc. across the codebase. This is better than the old approach, which was similar to props drilling, in that it is more readable and less error-prone.
    - I'd like to extend my thanks to the `vite-pwa` team for this approach! Learned a lot through forking `vite-plugin-pwa`, that's for sure.
- Additionally, the codebase now leverages Biome.js instead of Prettier and ESLint. For now, pre-commit hooks using Husky are not available.