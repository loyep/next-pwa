import type { CSSProperties } from "react";

import { NextSvg } from "./NextSvg.js";

interface LogoProps {
  nextLogoWidth?: string;
  nextLogoHeight?: string;
  fontSize: string;
  lineHeight: string;
  style?: CSSProperties;
  className?: string;
}

export const Logo = ({
  nextLogoWidth,
  nextLogoHeight,
  fontSize,
  lineHeight,
  style,
  className,
}: LogoProps) => (
  <div
    className={className}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      ...style,
    }}
  >
    <NextSvg
      width={nextLogoWidth}
      height={nextLogoHeight}
      style={{
        filter: "invert(100%)",
      }}
    />
    <span
      style={{
        color: "white",
        fontSize,
        lineHeight,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      PWA
    </span>
  </div>
);
