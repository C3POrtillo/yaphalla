import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2160px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-lato)'],
      },
      colors: {
        'primary-800': '#121d3b',
        'primary-600': '#1a387b',
        'secondary-600': '#a6dcd0',
        'tertiary-400': '#e9b560',
        'tertiary-300': '#d7a858',
        'tertiary-200': '#fdd38c',
        'tertiary-100': '#ffe0aa',
        'tertiary-50': '#ffe3b3',
        'background-600': '#5cb38f',
        'background-400': '#a9d991',
        'background-200': '#e1eda9',
        'lightbearer-800': '#284774',
        'lightbearer-400': '#65a0d4',
        'wilder-800': '#2f6263',
        'wilder-400': '#95dda8',
        'mauler-800': '#bc5f37',
        'mauler-400': '#eac34a',
        'graveborn-800': '#303a3b',
        'graveborn-600': '#576762',
        'graveborn-200': '#c7f57e',
        'celestial-800': '#eb9b0e',
        'celestial-400': '#fad211',
        'celestial-300': '#F8DF75',
        'celestial-200': '#647184',
        'celestial-50': '#ffffff',
        'hypogean-800':'#332153',
        'hypogean-400': '#f15dfa',
        'hex-background-600': '#a0a0a0'
      },
      boxShadow: {
        outline: '0 0 12px',
      },
      height: {
        inherit: 'inherit',
      },
      textShadow: {
        'black-outline': `1px 1px 0 black,
          -1px 1px 0 black,
          -1px -1px 0 black,
          1px -1px 0 black`,
        outline: `1px 1px 0 var(--tw-shadow-color),
        -1px 1px 0 var(--tw-shadow-color),
        -1px -1px 0 var(--tw-shadow-color),
        1px -1px 0 var(--tw-shadow-color)`
      },
      borderWidth: {
        '1': '1px',
      },
      spacing: {
        '12': '3rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '36': '9rem',
        '76': '19rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '144': '36rem',
        '192': '48rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
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
