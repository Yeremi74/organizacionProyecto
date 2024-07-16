/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        green_custom: {
          100: '#d7f5d7',
          200: '#9AE6B4',
          300: '#48a348',
        },
        yellow_custom: {
          100: '#f5ead7',
          200: '#9AE6B4',
          300: '#a38e48',
        },
        red_custom: {
          100: '#f5d7d7',
          300: '#9e3333',
        },
        gray_custom: {
          100: '#E0E0E0',
          200: '#858585',
          300: '#5A5A5A',
          400: '#3D3D3D',
        },
        custom_transparent: 'rgba(0, 0, 0, 0.41)',
      },
      height: {
        custom: '1px',
        custom_navBar: '510px',
      },
      fontSize: {
        peque: '10px',
      },
    },
  },
  plugins: [],
};
