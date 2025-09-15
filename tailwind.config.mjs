/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pepsi-blue': '#004B93',
        'pepsi-red': '#E31837',
        'pepsi-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
