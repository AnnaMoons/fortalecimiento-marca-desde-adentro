/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'turquoise': '#51B1B3',
          'turquoise-light': '#6DC1B9',
          'pink': '#F684A7',
          'coral': '#F66159',
          'yellow': '#FBC255',
          'cream': '#FDFFF3',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
