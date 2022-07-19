/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      header: [
        'Lora',
        '-apple-system',
        'Nimbus Roman No9 L',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft Yahei',
        'WenQuanYi Micro Hei',
        'ST Heiti',
        'sans-serif',
      ],
      text: [
        'Georgia',
        '-apple-system',
        'Nimbus Roman No9 L',
        'PingFang SC',
        'Hiragino Sans GB',
        'Microsoft Yahei',
        'WenQuanYi Micro Hei',
        'ST Heiti',
        'sans-serif',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
