import { Code } from "bright";

import { title } from "./bright-extensions.js";

Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: "html[data-theme='light']",
};
Code.extensions = [title];
Code.className = "!rounded-md";

export { Code };
