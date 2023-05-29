import type { NextRequest } from "next/server";
import { ImageResponse } from "next/server";

import { Logo } from "@/components/Logo.js";
import { DOCS_DOMAIN } from "@/shared/constants.js";
import { capitalizeFirstLetters } from "@/utils/capitalizeFirstLetters.js";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  const notoSansMono = await fetch(
    new URL("../../shared/notoSansMono.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(req.url);

  const providedTitle = searchParams.get("title") || "";

  const title = capitalizeFirstLetters(
    providedTitle.length > 50
      ? `${providedTitle.slice(0, 50)}...`
      : providedTitle
  );

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col justify-between bg-transparent p-10 text-white"
        style={{
          fontFamily: "'Noto Sans Mono'",
          backgroundImage: "linear-gradient(45deg, #000000 0%, #100721 100%)",
        }}
      >
        <div
          tw="flex items-center"
          style={{
            gap: "0.5rem",
          }}
        >
          <Logo
            nextLogoHeight="18px"
            nextLogoStyle={{
              filter: "invert(1)",
            }}
            fontSize="24px"
            lineHeight="32px"
          />
        </div>
        {title ? (
          <h1
            tw="w-full text-6xl font-bold leading-[60px] sm:text-7xl sm:tracking-tight"
            style={{
              wordBreak: "break-word",
            }}
          >
            {title}
          </h1>
        ) : (
          <></>
        )}
        <h3 tw="text-lg font-bold leading-7 sm:text-xl sm:tracking-tight">
          {DOCS_DOMAIN}
        </h3>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Noto Sans Mono",
          data: notoSansMono,
          style: "normal",
        },
      ],
    }
  );
};
