import type { Metadata } from "next";

import type { LayoutComponent } from "@/shared/types.js";

import { metadata as rootMetadata } from "../layout.js";
import { Sidebar } from "./Sidebar.js";

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
  <div className="w-full h-full flex flex-col md:flex-row relative">
    <Sidebar />
    {children}
  </div>
);

export default Layout;
