/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 2px 4px var(--tw-shadow-color)',
        DEFAULT: '2px 4px 8px var(--tw-shadow-color)',
        lg: '4px 8px 16px var(--tw-shadow-color)',
      },
      spacing: {
        '5vw': '5vw',
        '10vw': '10vw',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '.language-id': {
              'text-align': 'right',
              'padding-bottom': '2px',
            },
            pre: {
              'margin-left': `-${theme('spacing.10vw')}`,
              'margin-right': `-${theme('spacing.10vw')}`,
              [`@media (min-width: ${theme('screens.md')})`]: {
                'margin-left': 0,
                'margin-right': 0,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme('textShadow'),
        }
      )
    },
  ],
}
