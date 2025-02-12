import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,css}'
  ],
  plugins: [
    require('@tailwindcss/forms'), 
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            '--tw-shadow-color': theme('shadow.color'),
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
