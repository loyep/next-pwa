import { TextBox } from "@/components/TextBox";
import { type DocsTree, docsTree } from "@/utils/buildDocsTree.js";
import { clsx } from "@/utils/clsx.js";

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
  <div className="overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-100px)]">
    {docsTree.map((node) => (
      <SidebarContent key={node.id} node={node} />
    ))}
  </div>
);
