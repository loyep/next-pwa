import type { Metadata } from "next";

import type { LayoutComponent } from "@/shared/types.js";

import { metadata as rootMetadata } from "../layout.js";

export const metadata: Metadata = {
  openGraph: {
    ...rootMetadata.openGraph,
    title: "Docs",
  },
  twitter: {
    ...rootMetadata.twitter,
    title: "Docs",
  },
};

const Layout: LayoutComponent = ({ children }) => (
  <div className="w-full h-full flex">
    <aside className="flex flex-col md:top-16 md:shrink-0 transform-gpu transition-all ease-in-out print:hidden md:w-64 md:sticky md:self-start max-md:[transform:translate3d(0,-100%,0)]"></aside>
    {children}
  </div>
);

export default Layout;
