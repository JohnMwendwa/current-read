/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#101F3C",
        secondary: "#1d436b",
        orange: "#F9452B",
      },
    },
  },
  plugins: [],
};
