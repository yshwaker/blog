/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        rainbow: {
          '0%': { 'background-position': 'left' },
          '50%': { 'background-position': 'right' },
          '100%': { 'background-position': 'left' },
        },
      },
      animation: {
        rainbow: 'rainbow 2s ease-in-out infinite',
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
    fontFamily: {
      header: [
        'lora',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
