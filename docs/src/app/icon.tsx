import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ImageResponse } from "next/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const contentType = "image/png";

export const size = {
  width: 32,
  height: 32,
};

const Icon = async () => {
  const notoSansMono = await fs.readFile(
    path.join(__dirname, "../shared/notoSansMono.ttf")
  );
  return new ImageResponse(
    (
      <div
        tw="bg-black flex w-full h-full items-center justify-center rounded-full"
        style={{
          fontFamily: "'Noto Sans Mono'",
          backgroundImage: "linear-gradient(45deg, #000000 0%, #100721 100%)",
        }}
      >
        <span tw="ml-[1px] text-white text-xs text-center uppercase tracking-widest">
          PWA
        </span>
      </div>
    ),
    {
      ...size,
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

export default Icon;
