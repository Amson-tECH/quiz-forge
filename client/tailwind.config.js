/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          base: '#060814',
          panel: 'rgba(15, 22, 43, 0.72)',
          border: 'rgba(134, 156, 255, 0.3)',
          glow: '#3dd8ff',
          neon: '#7d6bff',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 30px rgba(61, 216, 255, 0.25)',
        card: '0 12px 40px rgba(8, 12, 28, 0.5)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(125, 107, 255, 0.25)' },
          '50%': { boxShadow: '0 0 38px rgba(61, 216, 255, 0.5)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}