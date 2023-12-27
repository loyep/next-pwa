---
"@ducanh2912/next-pwa": patch
---

fix(cache-on-front-end-nav): fixed error 'URL object could not be cloned.'

- This was due to us trying to send the URL object to our worker through `postMessage`.
