/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/index.html", "./src/**/*.js"],
  theme: {
    extend: {
      gap: {
        "gap-custom": "305px",
      },
      height: {
        "6/6": "95%",
      },
      inset: {
        "r-custom": "25%",
      },
      scale: {
        "custom": "1.02",
      },
    },
  },
  plugins: [],
};
