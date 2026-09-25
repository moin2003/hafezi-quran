/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quran: {
          paper: '#fbf8ee',
          paperDark: '#12161a',
          sepia: '#f4ecd8',
          sepiaDark: '#2c251d',
          gold: '#c59d5f',
          goldDark: '#a37b3f',
          emerald: '#1b5e20',
          emeraldLight: '#2e7d32',
          border: '#e4d8ba',
          darkBorder: '#333a42'
        }
      },
      fontFamily: {
        bengali: ['"Anek Bangla"', '"Hind Siliguri"', '"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
        bengaliSerif: ['"Tiro Bangla"', '"Noto Serif Bengali"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        kufi: ['"Reem Kufi"', 'sans-serif'],
        cairo: ['"Cairo"', 'sans-serif'],
        notoArabic: ['"Noto Naskh Arabic"', '"Cairo"', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', '"Cairo"', '"Reem Kufi"', '"Amiri Quran"', 'serif'],
        quran: ['"Amiri Quran"', '"Amiri"', 'serif'],
        scheherazade: ['"Scheherazade New"', '"Amiri"', 'serif']
      }
    },
  },
  plugins: [],
}
