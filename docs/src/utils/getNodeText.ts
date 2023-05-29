// Source: https://github.com/contentlayerdev/website/blob/main/src/utils/sluggify.ts
import type { ReactNode } from "react";

export const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return node.toString();
  }

  if (node instanceof Array) {
    return node.map(getNodeText).join("");
  }

  if (typeof node === "object" && (node as any)?.props?.children) {
    return getNodeText((node as any).props.children);
  }

  return "";
};
