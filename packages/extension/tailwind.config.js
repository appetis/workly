module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        wk: {
          lightgray: '#FAFAFA',
          secondary: '#7A9597',
          defgray: '#808080',
          light: '#EEEEEE',
          dark: '#042F31',
          'gray-box': '#AEAEAE',
          'gray-text': '#474747',
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
        'b-sm': '2px 2px 3px #AEAEAE',
        DEFAULT: '3px 3px 10px #333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
