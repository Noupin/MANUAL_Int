/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        manualBlue: '#004aeb',
        manualLightBlue: '#9db5ea',
        manualLighterBlue: '#cedaf5',
        manualDarkBlue: '#072a7a',
        manualWhite: '#FBFCFF',
      },
    },
  },
  plugins: [],
}
