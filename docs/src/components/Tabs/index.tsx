import type { ReactNode } from "react";

import { title } from "../bright-extensions.js";
import { Code } from "../Code.js";
import { tabs } from "./bright-extensions.js";

export const Tabs = ({ children }: { children: ReactNode }) => (
  <Code extensions={[title, tabs]}>{children}</Code>
);
