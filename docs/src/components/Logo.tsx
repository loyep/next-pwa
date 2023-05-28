import type { CSSProperties } from "react";

import { NextSvg } from "./NextSvg.js";

interface LogoProps {
  hideNextLogo?: boolean;
  nextLogoWidth?: string;
  nextLogoHeight?: string;
  nextLogoClassName?: string;
  nextLogoStyle?: CSSProperties;
  fontSize: string;
  lineHeight: string;
  style?: CSSProperties;
  className?: string;
}

export const Logo = ({
  hideNextLogo,
  nextLogoWidth,
  nextLogoHeight,
  nextLogoClassName,
  nextLogoStyle,
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
    {hideNextLogo && (
      <NextSvg
        width={nextLogoWidth}
        height={nextLogoHeight}
        className={nextLogoClassName}
        style={nextLogoStyle}
      />
    )}
    <span
      style={{
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
