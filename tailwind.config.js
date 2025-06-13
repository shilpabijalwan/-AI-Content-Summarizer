/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            strong: {
              color: '#1e40af', // blue-900 for light mode
            },
          },
        },
        invert: {
          css: {
            strong: {
              color: '#facc15', // yellow-400 for dark mode
              
            },
          },
        },
      },
    },
  },
  plugins: [typography],
  darkMode: 'class', // Enables class-based dark mode
};
