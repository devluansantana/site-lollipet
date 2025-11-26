/** @type {import('tailwindcss').Config} */
module.exports = {
  // ESSENCIAL: Diz ao Tailwind para procurar a classe 'dark' na tag <html>
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
