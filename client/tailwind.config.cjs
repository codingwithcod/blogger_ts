/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "half-transparent": "rgba(0,0,0,0.4)",
        primary: "#F1F1F2",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 1s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
