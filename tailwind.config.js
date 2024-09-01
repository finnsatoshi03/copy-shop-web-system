/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        sans2: ["Oswald", "sans-serif"],
      },
      container: {
        center: "true",
        padding: {
          lg: "8rem",
          md: "6rem",
          DEFAULT: "4rem",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        black: "#080603",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
