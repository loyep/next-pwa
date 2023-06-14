import { Workbox } from "workbox-window";

declare const __PWA_START_URL__: URL | RequestInfo;
declare const __PWA_SW__: string;
declare const __PWA_ENABLE_REGISTER__: boolean;
declare const __PWA_CACHE_ON_FRONT_END_NAV__: boolean;
declare const __PWA_AGGRFEN_CACHE__: boolean;
declare const __PWA_RELOAD_ON_ONLINE__: boolean;
declare const __PWA_SCOPE__: string;
declare global {
  interface Window {
    workbox: Workbox;
  }
}

if (
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  typeof caches !== "undefined"
) {
  if (__PWA_START_URL__) {
    caches.has("start-url").then((has) => {
      if (!has) {
        caches
          .open("start-url")
          .then((c) =>
            c.put(__PWA_START_URL__, new Response("", { status: 200 }))
          );
      }
    });
  }

  window.workbox = new Workbox(window.location.origin + __PWA_SW__, {
    scope: __PWA_SCOPE__,
  });

  if (__PWA_START_URL__) {
    window.workbox.addEventListener("installed", async ({ isUpdate }) => {
      if (!isUpdate) {
        const cache = await caches.open("start-url");
        const response = await fetch(__PWA_START_URL__);
        let _response = response;
        if (response.redirected) {
          _response = new Response(response.body, {
            status: 200,
            statusText: "OK",
            headers: response.headers,
          });
        }
        await cache.put(__PWA_START_URL__, _response);
      }
    });
  }

  window.workbox.addEventListener("installed", async () => {
    const nextDataCache = await caches.open("next-data");
    window.performance.getEntriesByType("resource").forEach((entry) => {
      const entryName = entry.name;
      if (
        entryName.startsWith(`${window.location.origin}/_next/data/`) &&
        entryName.endsWith(".json")
      ) {
        nextDataCache.add(entryName);
      }
    });
  });

  if (__PWA_ENABLE_REGISTER__) {
    window.workbox.register();
  }

  if (__PWA_CACHE_ON_FRONT_END_NAV__ || __PWA_START_URL__) {
    const cacheOnFrontEndNav = async (
      url?: string | URL | null | undefined
    ) => {
      if (!window.navigator.onLine || !url) {
        return undefined;
      }

      if (__PWA_START_URL__ && url === __PWA_START_URL__) {
        const res = await fetch(__PWA_START_URL__);
        if (!res.redirected) {
          const startUrlCache = await caches.open("start-url");
          return startUrlCache.put(__PWA_START_URL__, res);
        }
        return undefined;
      }

      if (__PWA_CACHE_ON_FRONT_END_NAV__) {
        const pagesCache = await caches.open("pages");
        const pageResponse = await pagesCache.match(url, {
          ignoreSearch: true,
        });
        if (!pageResponse) {
          const page = await fetch(url);
          if (page.ok) {
            const pageClone = page.clone();
            pagesCache.put(url, pageClone);
            if (
              __PWA_AGGRFEN_CACHE__ &&
              page.headers.get("Content-Type")?.includes("text/html")
            ) {
              try {
                const html = await page.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const links = doc.querySelectorAll<HTMLLinkElement>(
                  "link[rel='stylesheet']"
                );
                const scripts =
                  doc.querySelectorAll<HTMLScriptElement>("script[src]");

                const fetchPromises: Promise<void>[] = [];
                const stylesheetCache = await caches.open(
                  "static-style-assets"
                );
                const nextStaticJSCache = await caches.open(
                  "next-static-js-assets"
                );
                const staticJSCache = await caches.open("static-js-assets");

                links.forEach((link) =>
                  fetchPromises.push(stylesheetCache.add(link.href))
                );

                scripts.forEach((script) => {
                  fetchPromises.push(
                    (/\/_next\/static.+\.js$/i.test(script.src)
                      ? nextStaticJSCache
                      : staticJSCache
                    ).add(script.src)
                  );
                });

                return await Promise.all(fetchPromises);
              } catch {
                // Do nothing
              }
            }
          }
        }
      }

      return undefined;
    };

    const pushState = history.pushState;
    history.pushState = (...args) => {
      pushState.apply(history, args);
      cacheOnFrontEndNav(args[2]);
    };

    const replaceState = history.replaceState;
    history.replaceState = (...args) => {
      replaceState.apply(history, args);
      cacheOnFrontEndNav(args[2]);
    };

    window.addEventListener("online", () => {
      cacheOnFrontEndNav(window.location.pathname);
    });
  }

  if (__PWA_RELOAD_ON_ONLINE__) {
    window.addEventListener("online", () => {
      location.reload();
    });
  }
}
