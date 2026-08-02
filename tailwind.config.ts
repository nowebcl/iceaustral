import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#f4f9fd',
          100: '#e4f2fc',
          200: '#cce6f8',
          300: '#a3d3f4',
          400: '#73b9ee',
          500: '#4da0e6',
          600: '#2d82d4',
          700: '#1b67b8',
          800: '#0f53d6',
          900: '#0b2545',
          950: '#06172d',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20bd5a',
          dark: '#128C7E',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
