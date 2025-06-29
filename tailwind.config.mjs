import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(15px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        float2: 'float2 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
