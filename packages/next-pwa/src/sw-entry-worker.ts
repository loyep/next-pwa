declare const self: WorkerGlobalScope & typeof globalThis;

export type MessageType = {
  type: "__FRONTEND_NAV_CACHE__";
  shouldCacheAggressively: boolean;
  url: string;
};

self.onmessage = async (ev: MessageEvent<MessageType>) => {
  switch (ev.data.type) {
    case "__FRONTEND_NAV_CACHE__": {
      const url = ev.data.url;
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
            ev.data.shouldCacheAggressively &&
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
              const stylesheetCache = await caches.open("static-style-assets");
              const nextStaticJSCache = await caches.open(
                "next-static-js-assets"
              );
              const staticJSCache = await caches.open("static-js-assets");

              links.forEach((link) => {
                stylesheetCache.match(link.href).then((res) => {
                  if (!res) {
                    fetchPromises.push(stylesheetCache.add(link.href));
                  }
                });
              });

              scripts.forEach((script) => {
                const scriptCache = /\/_next\/static.+\.js$/i.test(script.src)
                  ? nextStaticJSCache
                  : staticJSCache;

                scriptCache.match(script.src).then((res) => {
                  if (!res) {
                    fetchPromises.push(scriptCache.add(script.src));
                  }
                });
              });

              return await Promise.all(fetchPromises);
            } catch {
              // Do nothing
            }
          }
        }
      }
      return Promise.resolve();
    }
    default:
      return Promise.resolve();
  }
};
