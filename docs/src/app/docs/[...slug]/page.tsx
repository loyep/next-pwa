import { allDocs } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import { mdxComponents } from "@/shared/mdxComponents.js";
import type { GenerateMetadata, PageComponent } from "@/shared/types.js";

export const revalidate = false;

export const generateStaticParams = async () =>
  allDocs.map((post) => ({ slug: post._raw.flattenedPath.split("/") }));

export const generateMetadata: GenerateMetadata = ({ params }) => {
  const post = allDocs.find(
    (post) => post._raw.flattenedPath === params.slug.join("/")
  );
  return { title: post?.title };
};

const PostLayout: PageComponent = async ({ params }) => {
  const slug = params.slug.join("/");
  const post = allDocs.find((post) => post._raw.flattenedPath === slug);

  if (post === undefined) {
    return <div>Post not found ({slug})</div>;
  }

  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <nav
        className="order-last hidden min-w-[300px] shrink-0 xl:block print:hidden px-4"
        aria-label="table of contents"
      >
        <div className="sticky top-16 overflow-y-auto pr-4 pt-6 text-sm hyphens-auto max-h-full ltr:-mr-4 rtl:-ml-4">
          <p className="mb-4 font-semibold tracking-tight dark:text-white text-black">
            On This Page
          </p>
          <div className="mt-8 border-t pt-8 sticky bottom-0 flex flex-col items-start gap-2 pb-8 dark:border-neutral-800 contrast-more:border-t contrast-more:border-neutral-400 contrast-more:shadow-none contrast-more:dark:border-neutral-400">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 contrast-more:text-gray-800 contrast-more:dark:text-gray-50"
            >
              Question? Give us feedback →
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 contrast-more:text-gray-800 contrast-more:dark:text-gray-50"
              href="#"
            >
              Edit this page
            </a>
          </div>
        </div>
      </nav>
      <article className="py-8 min-w-0 w-full">
        <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
          <Content components={mdxComponents} />
        </main>
      </article>
    </>
  );
};

export default PostLayout;
