// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005B8E",  // 主色调蓝色
        accent: "#FF7300",   // 按钮橙色
      },
    },
  },
  plugins: [],
};
