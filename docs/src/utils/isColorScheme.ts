import type { ColorScheme } from "../shared/types.js";

/**
 * Check if value is of type `ColorScheme`
 *
 * @example
 * ```ts
 *     const a: string = "dark";
 *     if (isColorScheme(a)) {
 *         //a is ColorScheme now
 *     }
 * ```
 * @param value - The value.
 * @returns
 */
export const isColorScheme = (value?: string): value is ColorScheme => typeof value === "string" && ["dark", "light"].includes(value);
