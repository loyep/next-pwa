import { allDocs } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

import { GITHUB_REPO_URL } from "@/shared/constants.js";
import { mdxComponents } from "@/shared/mdxComponents.js";
import type { GenerateMetadata, PageComponent } from "@/shared/types.js";
import { clsx } from "@/utils/clsx.js";

export const generateStaticParams = async () => allDocs.map((post) => ({ slug: post._raw.flattenedPath.split("/") }));

export const generateMetadata: GenerateMetadata = ({ params }) => {
  const pagePath = params.slug?.join("/") ?? "";
  const post = allDocs.find((post) => post._raw.flattenedPath === pagePath);
  return {
    title: post?.title,
  };
};

const navFooterTextClassName = clsx("text-xs font-medium", "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100");

const PostLayout: PageComponent = async ({ params }) => {
  const pagePath = params.slug?.join("/") ?? "";
  const post = allDocs.find((post) => post._raw.flattenedPath === pagePath);

  if (!post) {
    notFound();
  }

  const TableOfContents = getMDXComponent(post.headings);

  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <nav className="order-last hidden w-[350px] shrink-0 px-4 print:hidden xl:block" aria-label="Table of contents">
        <div className="sticky top-16 flex max-h-[calc(100vh-100px)] flex-col hyphens-auto pr-4 pt-6 text-sm ltr:-mr-4 rtl:-ml-4">
          <p className="mb-4 font-semibold tracking-tight text-black dark:text-white">On This Page</p>
          <div className="w-full self-stretch overflow-y-auto">
            <TableOfContents components={mdxComponents} />
          </div>
          <div className={clsx("sticky bottom-0 mt-8 flex flex-col items-start gap-2 border-t pb-8 pt-8", "dark:border-neutral-800")}>
            <a href={`${GITHUB_REPO_URL}/issues/new/choose`} target="_blank" rel="noreferrer" className={navFooterTextClassName}>
              Question? Give us feedback →<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={`${GITHUB_REPO_URL}/tree/master/docs/content/${post._raw.sourceFilePath}`}
              target="_blank"
              rel="noreferrer"
              className={navFooterTextClassName}
            >
              Edit this page →<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </nav>
      <article className="w-full min-w-0 md:py-8">
        <div className="w-full min-w-0 max-w-6xl px-6 py-4 md:px-12">
          <Content components={mdxComponents} />
        </div>
      </article>
    </>
  );
};

export default PostLayout;
