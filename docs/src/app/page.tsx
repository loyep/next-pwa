import { Inter } from "next/font/google";
import Link from "next/link";
import { Balancer, Provider as BalancerProvider } from "react-wrap-balancer";

import { Code } from "@/components/Code.js";
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
    label: "Performant",
    description: "Make your website loads as fast as is possible.",
  },
  {
    icon: "🔌",
    label: "Offline",
    description: "Proper offline support. For both App and Pages Router.",
  },
];

const Page = () => (
  <BalancerProvider>
    <div
      className={clsx(
        "w-full self-stretch",
        "bg-white dark:bg-black text-black dark:text-white",
        inter.className
      )}
    >
      <div className="w-full flex flex-col gap-5 px-5 py-40 items-center justify-center">
        <h1 className="font-extrabold tracking-tight my-2 text-5xl">
          <Balancer>Make performant websites with Next.js & PWA.</Balancer>
        </h1>
        <h2 className="font-medium tracking-tight my-2 text-2xl opacity-80">
          <Balancer>
            Next PWA enables you to create PWAs with Next.js. No configuration
            needed, yet so configurable.
          </Balancer>
        </h2>
        <Link
          href="/docs/next-pwa/getting-started"
          className={clsx(
            "border rounded-md px-4 py-3 transition-colors duration-100",
            "bg-black dark:bg-white text-white dark:text-black",
            "hover:bg-white hover:text-black hover:border-black",
            "hover:dark:bg-black hover:dark:text-white hover:dark:border-white"
          )}
        >
          Get started
        </Link>
        <Code>
          npx create-next-app@latest -e
          https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic
        </Code>
      </div>
      <div className="p-24 w-full">
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
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center px-5 py-10">
        <h2 className="font-medium tracking-tight my-2 text-2xl">
          Turn your website into a PWA. For a better user experience.
        </h2>
      </div>
    </div>
  </BalancerProvider>
);

export default Page;
