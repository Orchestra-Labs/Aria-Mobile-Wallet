import { COLORS } from './constants';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
    './app/**/*.{js,tsx,ts,jsx}',
    './components/**/*.{js,tsx,ts,jsx}',
    './constants/**/*.{js,tsx,ts,jsx}',
    './helpers/**/*.{js,tsx,ts,jsx}',
    './hooks/**/*.{js,tsx,ts,jsx}',
    './screens/**/*.{js,tsx,ts,jsx}',
    './layouts/**/*.{js,tsx,ts,jsx}',
    './ui-kit/**/*.{js,tsx,ts,jsx}',
  ],
  theme: {
    fontSize: {
      xs: ['11px', '13px'],
      sm: ['12px', '14px'],
      base: ['14px', '16px'],
      lg: ['16px', '20px'],
      xl: ['18px', '26px'],
    },
    colors: COLORS,
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      fontSize: {
        h1: ['32px', '44px'],
        h2: ['28px', '40px'],
        h3: ['24px', '34px'],
        h4: ['22px', '30px'],
        h5: ['20px', '28px'],
        h6: ['18px', '26px'],
      },
      animation: {
        'scale-up': 'scaleUp 0.3s ease-in-out',
        'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-in-out',
        press: 'press 1.2s infinite',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        press: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      height: {
        76: '18.75rem',
      },
      maxHeight: {
        76: '18.75rem',
      },
      minHeight: {
        76: '18.75rem',
      },
    },
  },
  plugins: [],
};
