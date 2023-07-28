import { Workbox } from "workbox-window";

import type { MessageType } from "./sw-entry-worker.js";

declare const __PWA_START_URL__: URL | RequestInfo;
declare const __PWA_SW__: string;
declare const __PWA_ENABLE_REGISTER__: boolean;
declare const __PWA_CACHE_ON_FRONT_END_NAV__: boolean;
declare const __PWA_AGGRFEN_CACHE__: boolean;
declare const __PWA_RELOAD_ON_ONLINE__: boolean;
declare const __PWA_SCOPE__: string;
declare const __PWA_SW_ENTRY_WORKER__: string | undefined;
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

  let swEntryWorker: Worker | undefined;

  if (__PWA_SW_ENTRY_WORKER__) {
    swEntryWorker = new Worker(__PWA_SW_ENTRY_WORKER__);
  }

  window.workbox = new Workbox(window.location.origin + __PWA_SW__, {
    scope: __PWA_SCOPE__,
  });

  if (__PWA_START_URL__) {
    window.workbox.addEventListener("activated", async ({ isUpdate }) => {
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

  window.workbox.addEventListener("activated", async () => {
    const nextDataCache = await caches.open("next-data");
    await Promise.all(
      window.performance
        .getEntriesByType("resource")
        .map(async ({ name: entryName }) => {
          if (
            entryName.startsWith(`${window.location.origin}/_next/data/`) &&
            entryName.endsWith(".json")
          ) {
            await nextDataCache.add(entryName);
          }
        })
    );
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
        swEntryWorker?.postMessage({
          type: "__FRONTEND_NAV_CACHE__",
          shouldCacheAggressively: __PWA_AGGRFEN_CACHE__,
          url,
        } as MessageType);
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
    window.addEventListener("online", () => location.reload());
  }
}
