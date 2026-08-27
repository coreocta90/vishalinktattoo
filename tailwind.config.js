/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#050508',
        cardDark: '#0a0a12',
        elevatedDark: '#10101a',
        goldPrimary: '#D4AF37',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 60px rgba(212, 175, 55, 0.5)',
        'gold-glow-sm': '0 0 20px rgba(212, 175, 55, 0.2)',
      },
      borderColor: {
        'gold-subtle': 'rgba(212, 175, 55, 0.15)',
        'gold-medium': 'rgba(212, 175, 55, 0.3)',
        'gold-bright': 'rgba(212, 175, 55, 0.6)',
      },
    },
  },
  plugins: [],
}
