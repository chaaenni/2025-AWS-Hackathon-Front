/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "layout-0": "var(--layout-0)",
        "layout-1": "var(--layout-1)",
        "layout-2": "var(--layout-2)",
        "layout-3": "var(--layout-3)",
        primary: "var(--primary)",
        "primary-secondary": "var(--primary-secondary)",
      },
      screens: {
        'xs': '393px',
      },
      fontFamily: {
        pretendard: ['Pretendard-Regular'],
        pretendard_bold: ['Pretendard-Bold'],
        large: "var(--large-font-family)",
        medium: "var(--medium-font-family)",
        small: "var(--small-font-family)",
        "small-bold": "var(--small-bold-font-family)",
      },
    },
  },
  plugins: [],
};
