import type { Compiler } from "@swc/core";

import * as logger from "./logger.js";

export const resolveSwc = () => {
  let swc: Compiler | undefined;

  for (const swcSource of ["next/dist/build/swc", "@swc/core"]) {
    try {
      swc = require(swcSource);
      break;
    } catch {
      // Do nothing, this swc source might not be available
    }
  }

  if (!swc) {
    logger.error(
      "Failed to resolve swc. Please install @swc/core if you haven't."
    );
    process.exit(1);
  }

  return swc;
};
