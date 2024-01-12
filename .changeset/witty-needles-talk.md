---
"@ducanh2912/next-pwa": patch
---

fix(disable): fixed `disable` not working properly

- In 10.2.0 and 10.2.1, when `disable` is set, some code is still unintendedly run, causing the resulting app to contain some erroneous JavaScript.
- This has been fixed in 10.2.2. Although we still run `parseOptions`, we only do so to get the default options.
