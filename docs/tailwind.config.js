/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2563eb",
          dark: "#7dd3fc",
        },
        blue: {
          450: "#4cc2ff",
          550: "#0078d4",
        },
        red: {
          650: "#C42B1C",
          1000: "#442726",
        },
        green: {
          150: "#DFF6DD",
          450: "#6CCB5F",
        },
        lime: {
          1000: "#393D1B",
        },
        yellow: {
          75: "#FFF4CE",
          1000: "#433519",
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
