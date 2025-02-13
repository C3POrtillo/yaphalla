/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,css}'
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
};
