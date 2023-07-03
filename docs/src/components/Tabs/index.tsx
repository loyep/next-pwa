import { Code } from "bright";
import type { ReactNode } from "react";

import { tabs, title } from "./bright-extensions.js";

export const Tabs = ({ children }: { children: ReactNode }) => (
  <Code extensions={[title, tabs]}>{children}</Code>
);
