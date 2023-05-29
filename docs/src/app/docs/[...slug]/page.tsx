import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import { GITHUB_REPO_URL } from "@/shared/constants.js";
import { mdxComponents } from "@/shared/mdxComponents.js";
import type { GenerateMetadata, PageComponent } from "@/shared/types.js";
import { capitalizeFirstLetters } from "@/utils/capitalizeFirstLetters.js";
import { clsx } from "@/utils/clsx";

export const dynamicParams = false;

export const generateStaticParams = async () =>
  allDocs.map((post) => ({ slug: post._raw.flattenedPath.split("/") }));

export const generateMetadata: GenerateMetadata = ({ params }) => {
  const post = allDocs.find(
    (post) => post._raw.flattenedPath === params.slug.join("/")
  );
  const title =
    post?.title &&
    capitalizeFirstLetters(
      post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title
    );
  return {
    title: post?.title,
    openGraph: {
      title: post?.title,
      images: `/og?title=${title}`,
    },
    twitter: {
      title: post?.title,
      images: `/og?title=${title}`,
    },
  };
};

const navFooterTextClassName = clsx(
  "text-xs font-medium",
  "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
  "contrast-more:text-gray-800 contrast-more:dark:text-gray-50"
);

const PostLayout: PageComponent = async ({ params }) => {
  const slug = params.slug.join("/");
  const post = allDocs.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  const TableOfContents = getMDXComponent(post.headings);

  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <nav
        className="order-last hidden w-[300px] shrink-0 xl:block print:hidden px-4"
        aria-label="Table of contents"
      >
        <div className="sticky flex flex-col max-h-[calc(100vh-100px)] top-16 pr-4 pt-6 text-sm hyphens-auto ltr:-mr-4 rtl:-ml-4">
          <p className="mb-4 font-semibold tracking-tight dark:text-white text-black">
            On This Page
          </p>
          <div className="overflow-y-auto w-full self-stretch">
            <TableOfContents components={mdxComponents} />
          </div>
          <div
            className={clsx(
              "mt-8 border-t pt-8 sticky bottom-0 flex flex-col items-start gap-2 pb-8",
              "dark:border-neutral-800",
              "contrast-more:border-t contrast-more:border-neutral-400 contrast-more:shadow-none contrast-more:dark:border-neutral-400"
            )}
          >
            <a
              href={`${GITHUB_REPO_URL}/issues/new/choose`}
              target="_blank"
              rel="noreferrer"
              className={navFooterTextClassName}
            >
              Question? Give us feedback →
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={`${GITHUB_REPO_URL}/tree/master/docs/content/${post._raw.sourceFilePath}`}
              target="_blank"
              rel="noreferrer"
              className={navFooterTextClassName}
            >
              Edit this page →
              <span className="sr-only"> (opens in a new tab)</span>
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
