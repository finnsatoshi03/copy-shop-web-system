/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        sans2: ["Oswald", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          lg: "8rem",
          md: "6rem",
          DEFAULT: "4rem",
        },
      },
    },
  },
  plugins: [],
};
