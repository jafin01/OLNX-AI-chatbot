/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cred: "#e3a2a5",
        "cred-light": "#f1afb2",
        "cred-dark": "#ad6c79",
        cgreen: "#12ED94",
        "cgreen-light": "#d5efd3",
        "cgreen-dark": "#b6cab1",
      },
    },
  },
  plugins: [],
};
