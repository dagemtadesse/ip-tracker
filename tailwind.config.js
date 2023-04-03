/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubrick: "Rubik",
      },
      backgroundImage: {
        "hero-image-desktop": "url('/pattern-bg-desktop.png')",
        "hero-image-mobile": "url('/pattern-bg-mobile.png')",
      },
      colors: {
        dark: "hsl(0, 0%, 17%)",
        darkGray: "hsl(0, 0%, 59%)",
      },
    },
  },
  plugins: [],
};
