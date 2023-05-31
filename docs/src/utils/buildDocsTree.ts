import { allDocs, type Docs } from "contentlayer/generated";
import { v4 as uuidv4 } from "uuid";

export interface DocsTree {
  id: string;
  title: string;
  url: string | undefined;
  children: DocsTree[];
}

type BuildMap = Record<
  string,
  {
    id: string;
    childId: string[];
    url: string | undefined;
    title: string;
  }
>;

const fallbackTitle = (title: string | undefined, url: string) =>
  title ?? url.slice(url.lastIndexOf("/") + 1);

const buildChildren = (docPath: string, buildMap: BuildMap) => {
  const result: DocsTree[] = [];
  for (const childPath of buildMap[docPath].childId) {
    const childDocPath = `${docPath}/${childPath}`;
    const { id, title, url } = buildMap[childDocPath];
    result.push({
      id,
      title,
      url,
      children: buildChildren(childDocPath, buildMap),
    });
  }
  return result;
};

export const buildDocsTree = (docs: Docs[]): DocsTree[] => {
  const mapUrlToDoc: Record<string, Docs> = {};
  const docUrls: string[] = [];

  for (const doc of docs) {
    mapUrlToDoc[doc.url] = doc;
    docUrls.push(doc.url);
  }

  // map a segment to its id, title, url, and child segments.
  const map: BuildMap = {};

  for (const doc of docUrls) {
    // we split the path then add every segment to the map (if they do not exist)
    const splitted = doc.split("/").slice(1);
    let currentPath = `/${splitted[0]}`;

    for (let i = 1; i < splitted.length; ++i) {
      const currentSegment = splitted[i];
      const parentPath = currentPath;

      currentPath += `/${currentSegment}`;

      if (!map[parentPath]) {
        const parentOnDocs = mapUrlToDoc[parentPath];

        map[parentPath] = {
          id: uuidv4(),
          title: fallbackTitle(parentOnDocs?.title, parentPath),
          url: parentOnDocs?.url,
          childId: [],
        };
      }

      if (!map[currentPath]) {
        const id = uuidv4();

        map[parentPath].childId.push(currentSegment);

        const currentOnDocs = mapUrlToDoc[currentPath];

        map[currentPath] = {
          id,
          title: fallbackTitle(currentOnDocs?.title, currentPath),
          url: currentOnDocs?.url,
          childId: [],
        };
      }
    }
  }

  // build the docs tree from the map
  const result: DocsTree[] = [];

  // We don't need `/docs` in the tree, so we do it like this.
  for (const doc of map["/docs"].childId) {
    const docPath = `/docs/${doc}`;
    const { id, title, url } = map[docPath];
    result.push({
      id,
      title,
      url,
      children: buildChildren(docPath, map),
    });
  }

  return result;
};

export const docsTree = buildDocsTree(allDocs);
