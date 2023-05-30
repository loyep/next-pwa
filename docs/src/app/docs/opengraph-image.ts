import { generateOGImage } from "@/utils/generateOGImage.js";

export const alt = "Next PWA - Docs";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

const opengraghImage = () => generateOGImage(size, "Docs");

export default opengraghImage;
