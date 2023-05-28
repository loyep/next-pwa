import { ImageResponse } from "next/server";

export const contentType = "image/png",
  size = {
    width: 32,
    height: 32,
  };

const Icon = async () => {
  return new ImageResponse(
    (
      <div tw="bg-black flex w-full h-full items-center justify-center rounded-full">
        <span tw="ml-[1px] text-white text-xs text-center uppercase tracking-widest">
          PWA
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
};

export default Icon;
