import { allDocs, type Docs } from "contentlayer/generated";
import { v4 as uuidv4 } from "uuid";

interface DocsTree {
  id: string;
  title: string;
  children: DocsTree[];
}

type BuildMap = Record<
  string,
  {
    id: string;
    childId: string[];
    title: string;
  }
>;

const findTitle = (url: string) => {
  return (
    allDocs.find((doc) => doc.url === url)?.title ??
    url.slice(url.lastIndexOf("/") + 1)
  );
};

const buildChildren = (docPath: string, buildMap: BuildMap) => {
  const result: DocsTree[] = [];
  for (const childPath of buildMap[docPath].childId) {
    const childDocPath = `${docPath}/${childPath}`;
    const { id, title } = buildMap[childDocPath];
    result.push({
      id,
      title,
      children: buildChildren(childDocPath, buildMap),
    });
  }
  return result;
};

export const buildDocsTree = (docs: Docs[]): DocsTree[] => {
  const map: BuildMap = {};
  for (const doc of docs) {
    const splitted = doc.url.split("/").slice(1);
    let currentPath = `/${splitted[0]}`;
    for (let i = 1; i < splitted.length; ++i) {
      const currentSegment = splitted[i];

      const parentPath = currentPath;

      currentPath += `/${currentSegment}`;

      const isEnd = i === splitted.length - 1;

      if (!map[parentPath]) {
        map[parentPath] = {
          id: uuidv4(),
          title: findTitle(parentPath),
          childId: [],
        };
      }

      if (!map[currentPath]) {
        const id = uuidv4();

        map[parentPath].childId.push(currentSegment);

        map[currentPath] = {
          id,
          title: isEnd ? doc.title : findTitle(currentPath),
          childId: [],
        };
      }
    }
  }

  const result: DocsTree[] = [];

  // We don't need `/docs` in the tree, so we do it like this.
  for (const doc of map["/docs"].childId) {
    const docPath = `/docs/${doc}`;
    const { id, title } = map[docPath];
    result.push({
      id,
      title,
      children: buildChildren(docPath, map),
    });
  }

  return result;
};

export const docsTree = buildDocsTree(allDocs);
