import { Inter } from "next/font/google";
import Link from "next/link";
import { Balancer, Provider as BalancerProvider } from "react-wrap-balancer";

import { InlineCode } from "@/components/InlineCode.js";
import { clsx } from "@/utils/clsx.js";

const inter = Inter({ subsets: ["latin"] });

interface Feature {
  icon: string;
  label: string;
  description: string;
}

const FEATURES_LIST: Feature[] = [
  {
    icon: "✊",
    label: "Zero-config",
    description: "No configuration needed to get started...",
  },
  {
    icon: "⛏️",
    label: "Configurable",
    description:
      "...yet there are many options available to extend the plugin.",
  },
  {
    icon: "💯",
    label: "Fast",
    description: "Make your website loads as fast as is possible.",
  },
  {
    icon: "🔌",
    label: "Offline",
    description: "Proper offline support. For both App and Pages Router.",
  },
  {
    icon: "🚀",
    label: "Developer experience",
    description:
      "Built-in Typescript definitions and JSDoc to enable the best DX.",
  },
];

const Page = () => (
  <BalancerProvider>
    <div
      className={clsx(
        "w-full self-stretch",
        "bg-white text-black dark:bg-black dark:text-white",
        inter.className
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 px-5 py-40">
        <h1
          className={clsx(
            "my-2 text-5xl font-extrabold tracking-tight",
            "bg-gradient-to-t from-gray-500 to-black bg-clip-text text-transparent dark:from-gray-400 dark:to-white"
          )}
        >
          <Balancer>Make performant web apps with Next.js & PWA.</Balancer>
        </h1>
        <h2 className="my-2 text-2xl font-medium tracking-tight opacity-80">
          <Balancer>
            <InlineCode>next-pwa</InlineCode> enables you to create PWAs with
            Next.js. No configuration needed, yet so configurable.
          </Balancer>
        </h2>
        <Link
          href="/docs/next-pwa/getting-started"
          className={clsx(
            "rounded-md border px-6 py-3 font-bold transition-colors duration-100",
            "bg-black text-white dark:bg-white dark:text-black",
            "hover:border-black hover:bg-white hover:text-black",
            "hover:dark:border-white hover:dark:bg-black hover:dark:text-white",
            "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          )}
        >
          Get started
        </Link>
        <InlineCode>
          npx create-next-app@latest -e
          https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic
        </InlineCode>
      </div>
      <div className="w-full p-4 md:p-24">
        <div className="grid w-full text-left lg:mb-0 lg:grid-cols-4">
          {FEATURES_LIST.map((feature, idx) => (
            <div
              key={`homepage-feature-lists-${idx}`}
              className={clsx(
                "rounded-lg border border-transparent px-5 py-4 transition-colors",
                "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              )}
            >
              <h2 className="mb-3 text-2xl font-semibold">
                {feature.icon} {feature.label}
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BalancerProvider>
);

export default Page;
