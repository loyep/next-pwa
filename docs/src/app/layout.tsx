import "./globals.css";

import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar/index.js";
import { docsDomain as DOCS_DOMAIN } from "@/shared/constants.js";
import type { LayoutComponent } from "@/shared/types.js";

import { MetaThemeColor } from "./MetaThemeColor.js";
import { RootClientLogic } from "./RootClientLogic.js";

export const dynamic = "error";

export const metadata: Metadata = {
  metadataBase: new URL(DOCS_DOMAIN),
  alternates: {
    canonical: "./",
  },
  referrer: "no-referrer",
  title: {
    default: "Next PWA",
    template: "%s - Next PWA",
  },
  description: "Make performant websites with Next.js & PWA.",
  applicationName: "Next PWA",
  authors: [{ name: "DuCanhGH", url: "https://github.com/DuCanhGH/" }],
  keywords:
    "react, pwa, service-worker, progressive-web-app, nextjs, next.js, workbox",
  openGraph: {
    type: "website",
    title: {
      default: "Next PWA",
      template: "%s - Next PWA",
    },
    description: "Make performant websites with Next.js & PWA.",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Next PWA",
      template: "%s - Next PWA",
    },
    description: "Make performant websites with Next.js & PWA.",
  },
};

const RootLayout: LayoutComponent = ({ children }) => (
  <html lang="en" data-theme="light" suppressHydrationWarning>
    <head>
      <script
        id="get-initial-color-scheme"
        dangerouslySetInnerHTML={{
          __html: `window.DID_FETCH_INITIAL_COLOR||(window.DID_FETCH_INITIAL_COLOR=!0,document.documentElement.dataset.theme=(()=>{const e=localStorage.getItem("theme");if(e&&["dark","light"].includes(e))return e;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})());`,
        }}
      />
      <MetaThemeColor />
    </head>
    <body>
      <div id="root-container">
        <RootClientLogic />
        <Navbar />
        <main id="main-content">{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
