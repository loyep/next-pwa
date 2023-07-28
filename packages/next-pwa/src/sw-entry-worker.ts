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

              const fetchPromises: Promise<void>[] = [];
              const stylesheetCache = await caches.open("static-style-assets");
              const nextStaticJSCache = await caches.open(
                "next-static-js-assets"
              );
              const staticJSCache = await caches.open("static-js-assets");

              // we use RegExp instead of something more complex, such as `cheerio`,
              // to handle the DOM so as to avoid unnecessary bloat as our usecase is
              // fairly simple.

              for (const [fullLink, link] of html.matchAll(
                /<link.*?href=['"](.*?)['"].*?>/g
              )) {
                if (/rel=['"]stylesheet['"]/.test(fullLink)) {
                  fetchPromises.push(
                    stylesheetCache.match(link).then((res) => {
                      if (!res) {
                        return stylesheetCache.add(link);
                      }
                      return Promise.resolve();
                    })
                  );
                }
              }

              for (const [, script] of html.matchAll(
                /<script.*?src=['"](.*?)['"].*?>/g
              )) {
                const scriptCache = /\/_next\/static.+\.js$/i.test(script)
                  ? nextStaticJSCache
                  : staticJSCache;

                fetchPromises.push(
                  scriptCache.match(script).then((res) => {
                    if (!res) {
                      return scriptCache.add(script);
                    }
                    return Promise.resolve();
                  })
                );
              }

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
