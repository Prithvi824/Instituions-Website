/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#FFF7F1",
        light_pink: "#F9D9EB",
        light_green: "#7FD6C2",
        light_peach: "#FFE4C9",
        light_blue: "#BED1CF",
      },
      dropShadow: {
        normal: "2px 2px 2px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
