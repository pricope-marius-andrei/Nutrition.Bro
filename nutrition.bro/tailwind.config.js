/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'lg': '1080px',
    },
    fontFamily:{
      'fredoka-regular': "Fredoka-Regular",
      'fredoka-bold': "Fredoka-Bold",
      'fredoka-semi-bold': "Fredoka-Semi-Bold",
      'fredoka-light': "Fredoka-Light",
    },
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'black': '#454d66',
      'green': '#309975',
      'green-lime': '#58b368',
      'yellow': '#dad873',
      'yellow-light': '#efeeb4',
      'grass-green': '#34d9a0',
      'dark-grass': '#13815b',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
