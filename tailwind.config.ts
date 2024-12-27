/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
    './app/**/*.{js,tsx,ts,jsx}',
    './comonents/**/*.{js,tsx,ts,jsx}',
    './constants/**/*.{js,tsx,ts,jsx}',
    './helpers/**/*.{js,tsx,ts,jsx}',
    './hooks/**/*.{js,tsx,ts,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
