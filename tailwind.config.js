/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
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
    fontfamily: {
      header: [
        'lora',
        '-apple-system',
        'nimbus roman no9 l',
        'pingfang sc',
        'hiragino sans gb',
        'microsoft yahei',
        'wenquanyi micro hei',
        'st heiti',
        'sans-serif',
      ],
      text: [
        'georgia',
        '-apple-system',
        'nimbus roman no9 l',
        'pingfang sc',
        'hiragino sans gb',
        'microsoft yahei',
        'wenquanyi micro hei',
        'st heiti',
        'sans-serif',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
