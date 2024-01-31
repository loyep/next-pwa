/**
 * For a given path, this function ensures that there is no backslash
 * escaping slashes in the path.
 *
 * @param path
 */
export const normalizePathSep = (path: string): string => {
  return path.replace(/\\/g, "/");
};
