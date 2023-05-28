import type { Route } from "next";
import localFont from "next/font/local";
import type { FC } from "react";

import { Logo } from "../Logo.js";
import { NavMobileBurger } from "./client/Mobile/Burger.js";
import { NavMobileMenu } from "./client/Mobile/Menu.js";
import { NavLinks } from "./client/Shared/Links.js";
import { NavToggleSchemeButton } from "./client/Shared/ToggleColorScheme.js";
import { NavLink } from "./Link/index.js";

const notoSansMono = localFont({
  src: "../../shared/notoSansMono.ttf",
  display: "swap",
});

export interface MainLinkProps {
  link: Route;
  label: string;
}

export const Navbar: FC = () => (
  <nav className="transition-colors_opa sticky top-0 z-[9223372036854775806] h-fit max-h-screen border-b-[0.25px] border-neutral-300 bg-white duration-100 dark:border-gray-700 dark:bg-black">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center gap-[5px] sm:hidden">
          <NavMobileBurger />
        </div>
        <div className="flex flex-1 items-center justify-center sm:flex-none sm:items-stretch sm:justify-start">
          <NavLink href="/home" aria-label="Go to home">
            <Logo
              nextLogoHeight="16px"
              nextLogoClassName="dark:invert"
              fontSize="19.2px"
              lineHeight="25.6px"
              className={notoSansMono.className}
            />
          </NavLink>
        </div>
        <div className="absolute inset-y-0 right-0 flex h-full w-fit flex-row items-center gap-[5px] sm:static sm:w-full">
          <div className="hidden h-full grow items-center overflow-x-hidden pr-2 sm:ml-6 sm:flex sm:pr-0">
            <div className="overflow-x-overlay hidden h-full grow flex-row-reverse items-center gap-[5px] overflow-x-auto sm:flex">
              <div className="flex max-h-full flex-row gap-[inherit]">
                <NavLinks type="desktop" />
              </div>
            </div>
          </div>
          <NavToggleSchemeButton className="hidden sm:flex" />
        </div>
      </div>
    </div>
    <NavMobileMenu />
  </nav>
);
