import type { Metadata } from "next";

import type { LayoutComponent } from "@/shared/types.js";

import { metadata as rootMetadata } from "../layout.js";
import { Sidebar } from "./Sidebar.js";
import { SidebarMobileButton } from "./SidebarMobileButton.js";
import { SidebarWrapper } from "./SidebarWrapper.js";

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
    <SidebarMobileButton />
    <SidebarWrapper>
      <Sidebar />
    </SidebarWrapper>
    {children}
  </div>
);

export default Layout;
