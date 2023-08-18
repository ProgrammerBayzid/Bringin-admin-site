/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/mistral-ui/components/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}