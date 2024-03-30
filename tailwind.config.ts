import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        primaryBlack : "#262626",
        primaryBlue : "#4C52C4",
        secondaryBlack : "#262626",
        bodyText : "#666666",
      }
    },
  },
  plugins: [],
};
export default config;
