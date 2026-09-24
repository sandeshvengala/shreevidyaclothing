/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FDFBF7',
        deepBrown: '#241A15',
        mutedBrown: '#6F6259',
        gold: '#B88A5A',
        maroon: '#7B3F35',
        beige: '#E9D8C3',
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 18px 45px rgba(36,26,21,0.08)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 20% 20%, rgba(184,138,90,0.08), transparent 22%), radial-gradient(circle at 80% 10%, rgba(123,63,53,0.08), transparent 20%)'
      }
    },
  },
  plugins: [],
};
