/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"fixedsys"', 'fixedsys']
    },
    dropShadow: {
      theme: "0 3px 0px rgba(7, 17, 20, 1)", // same colour as darkblue theme
    },
    extend: {
      colors: {
        theme: {
          active: "#0c7999",
          deskblue: "#053543",
          shadowblue: "#102c34",
          shadowblue2: "#0d242b",
          shadowblue3: "#0b1e23",
          darkblue: "#071114",
          darkerblue: "#050b0e",
          bushes: "#a4bbc2",
          darkbushes: "#7d949a",
        },
      },
    },
  },
  plugins: [],
}

