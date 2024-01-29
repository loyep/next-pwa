import { createDescribe } from "../../test-utils/index.ts";

createDescribe("integration basePath", { sourceDir: __dirname, skipInstall: false }, ({ next, testMode }) => {
  it("should render", async () => {
    const $ = await next.render("/next-pwa");
    expect($("#welcome-text").text()).toBe("This is a Next.js PWA!");
  });

  it("should fetch image", async () => {
    const image = await next.fetch("/next-pwa/next.svg");
    expect(image.status).toBe(200);
    const favicon = await next.fetch("/next-pwa/favicon.ico");
    expect(favicon.status).toBe(200);
  });

  it("should be able to fetch service worker", async () => {
    const sw = await next.fetch("/next-pwa/sw.js");
    expect(sw.status).toBe(200);
    expect(sw.headers.get("Content-Type")?.includes("application/javascript")).toBe(true);
    const swContent = await sw.text();
    if (testMode === "start") {
      expect(/url:\"\/next-pwa\/swe-worker-(.*?).js\"/.test(swContent)).toBe(true);
      expect(/url:\"\/next-pwa\/_next\/..\/public\/swe-worker-(.*?).js\"/.test(swContent)).toBe(false);
    }
  });
});
