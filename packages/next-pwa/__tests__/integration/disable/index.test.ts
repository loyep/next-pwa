import { createDescribe } from "../../test-utils/index.ts";

createDescribe("integration disable", { sourceDir: __dirname, skipInstall: false }, ({ next, testMode }) => {
  it("should render, have notification, and show no error", async () => {
    const $ = await next.render("/");
    expect($("#welcome-text").text()).toBe("This is a Next.js PWA!");
    expect(next.cliOutput.includes("PWA support is disabled.")).toBe(true);
    expect(next.cliOutput.includes("Uncaught ReferenceError")).toBe(false);
  });

  it("should fetch image", async () => {
    const image = await next.fetch("/next.svg");
    expect(image.status).toBe(200);
    const favicon = await next.fetch("/favicon.ico");
    expect(favicon.status).toBe(200);
  });
});
