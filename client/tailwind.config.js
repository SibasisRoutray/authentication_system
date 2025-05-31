// tailwind.config.js
import flowbite from 'flowbite/plugin';
export default {
  darkMode: 'class', // enables class-based dark mode
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF',     // Blue
          secondary: '#F59E0B',   // Amber
          accent: '#10B981',      // Emerald
        },
      },
    },
    plugins: [flowbite],
  };
  