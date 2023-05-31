import { TextBox } from "@/components/TextBox";
import { type DocsTree, docsTree } from "@/utils/buildDocsTree.js";
import { clsx } from "@/utils/clsx.js";

import { SidebarClient } from "./SidebarClient.js";

const sidebarButtonClass = clsx(
  "z-20 w-full h-fit flex flex-row gap-2 items-center justify-start px-4 pt-4 md:hidden",
  "bg-gray-100 duration-100 dark:bg-neutral-900 text-black dark:text-white "
);

const sidebarBaseClass = clsx(
  "overflow-y-auto overflow-x-hidden px-4 pb-4 md:pt-4 grow md:h-[calc(100vh-100px)]",
  "transform-gpu transition-all duration-100 ease-in-out",
  "bg-gray-100 dark:bg-neutral-900"
);

const SidebarContent = ({ node }: { node: DocsTree }) => {
  return (
    <li className="flex flex-col pt-2">
      <TextBox href={node.url}>{node.title}</TextBox>
      {node.children.length > 0 && (
        <div className="transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none">
          <div className="transition-opacity duration-500 ease-in-out opacity-100 ltr:pr-0 rtl:pl-0">
            <ul
              className={clsx(
                "flex flex-col relative",
                "before:absolute before:inset-y-1 before:w-px before:bg-gray-200 before:content-[''] dark:before:bg-neutral-800",
                "ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0 ltr:ml-3 rtl:mr-3"
              )}
            >
              {node.children.map((childNode) => (
                <SidebarContent key={childNode.id} node={childNode} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export const Sidebar = () => (
  <div
    className={clsx(
      "z-10 flex flex-col fixed w-full print:hidden",
      "md:top-16 md:sticky md:shrink-0 md:w-64 md:self-start"
    )}
  >
    <SidebarClient
      sidebarButtonClass={sidebarButtonClass}
      sidebarBaseClass={sidebarBaseClass}
    >
      {docsTree.map((node) => (
        <SidebarContent key={node.id} node={node} />
      ))}
    </SidebarClient>
  </div>
);
