import Image from "next/image";
import { usePathname } from "next/navigation";

import NextSvg from "./public/next.svg";

export default {
  logo: (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Image
        src={NextSvg}
        alt=""
        width={70}
        height={70}
        style={{
          width: 70,
          height: 70,
          filter: "invert(1)",
        }}
      />
      <span
        style={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        PWA
      </span>
    </div>
  ),
  project: {
    link: "https://github.com/DuCanhGH/next-pwa",
  },
  useNextSeoProps() {
    const pathname = usePathname();
    if (pathname !== "/") {
      return {
        titleTemplate: "%s - Next PWA",
      };
    }
  },
};
