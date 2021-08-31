module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          lightgray: '#FAFAFA',
          darkgray: '#373737',
          light: '#EEEEEE',
          dark: '#151515',
        },
      },
      fontWeight: {
        'extra-light': 100,
        light: 300,
        normal: 400,
        medium: 500,
        'semi-bold': 600,
        bold: 700,
        'extra-bold': 800,
        black: 900,
      },
      boxShadow: {
        sm: '2px 2px 4px #333',
        DEFAULT: '3px 3px 10px #333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
