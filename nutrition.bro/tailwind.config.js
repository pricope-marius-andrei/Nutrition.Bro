/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    heroPatternsShades: ["100", "500"],
    heroPatternsColors: ["green-lime", "grass-green"],
    heroPatternsOpacities: ['0', '10', '50', '90', '100'],
  },
  theme: {
    screens: {
      'lg': '1280px',
      'md': '800px',
      'sm': '720px',
    },
    fontFamily:{
      'fredoka-regular': "Fredoka-Regular",
      'fredoka-bold': "Fredoka-Bold",
      'fredoka-semi-bold': "Fredoka-Semi-Bold",
      'fredoka-light': "Fredoka-Light",
      'fredoka-medium': "Fredoka-Medium",
    },
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'gray':'#F4F4F4',
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
        keyframes: {
          larger: {'0%': { width: '384px' }, '50%': {width: "300px"}, '100%':{width:"384px"}},
          // editMode: {'0%' : {border-color: }}
        },
        animation: {
          larger : 'larger 1s'
        }
    },
  },
  plugins: [
    require('tailwindcss-hero-patterns'),
  ],
}
