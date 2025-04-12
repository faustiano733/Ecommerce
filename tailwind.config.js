/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        samsung: ["SamsungSans", "sans-serif"],
      }, 
      textTransform: {
        'capitalize-first': 'capitalize-first', // Você precisaria de um plugin para isso
      },
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#000', // Sua cor azul
        'text-primary': '#000', // Cor escura para texto
      },
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        left: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)",
        right: "4px 0 6px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};