import type { Metadata } from "next";
import type { ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";
import type { ReactNode } from "react";

import type { AVAILABLE_COLOR_SCHEMES } from "./constants.js";

export type ColorScheme = (typeof AVAILABLE_COLOR_SCHEMES)[number];

export interface PageProps {
  params?: any;
  searchParams?: any;
}
export interface LayoutProps {
  children?: ReactNode;
  params?: any;
}

export type PageComponent = (props: PageProps) => ReactNode | Promise<ReactNode>;
export type LayoutComponent = (props: LayoutProps) => ReactNode | Promise<ReactNode>;
export type GenerateMetadata = (props: PageProps, parent: ResolvingMetadata) => Metadata | Promise<Metadata>;
