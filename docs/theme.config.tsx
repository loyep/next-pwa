import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

import { Logo } from "@/components/Logo.js";
import { docsDomain } from "@/shared/constants.js";

const notoSansMono = localFont({
  src: "./src/shared/notoSansMono.ttf",
  display: "swap",
});

const nextraConfig: DocsThemeConfig = {
  logo: (
    <Logo
      nextLogoHeight="16px"
      fontSize="19.2px"
      lineHeight="25.6px"
      className={notoSansMono.className}
    />
  ),
  docsRepositoryBase: "https://github.com/DuCanhGH/next-pwa/blob/master/docs",
  project: {
    link: "https://github.com/DuCanhGH/next-pwa",
  },
  useNextSeoProps() {
    const pathname = usePathname();
    if (pathname !== "/") {
      return {
        titleTemplate: "%s - Next PWA",
      };
    }
  },
  head: function useHead() {
    const { title } = useConfig();
    const socialCard = `${docsDomain}/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Make beautiful websites with Next.js & MDX."
        />
        <meta
          name="og:description"
          content="Make beautiful websites with Next.js & MDX."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content={docsDomain} />
        <meta name="twitter:url" content={docsDomain} />
        <meta
          name="og:title"
          content={title ? title + " - Next PWA" : "Next PWA"}
        />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Next PWA" />
        <link rel="icon" href="/icon" type="image/png" />
      </>
    );
  },
};

export default nextraConfig;
