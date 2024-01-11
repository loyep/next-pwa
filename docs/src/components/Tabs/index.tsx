import type { ReactNode } from "react";

import { Code } from "../Code.js";
import { title } from "../bright-extensions.js";
import { tabs } from "./bright-extensions.js";

export const Tabs = ({ children }: { children: ReactNode }) => <Code extensions={[title, tabs]}>{children}</Code>;
