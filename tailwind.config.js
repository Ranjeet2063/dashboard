/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* FORTGATE: dark purple-gray palette */
        dark: {
          bg: '#1a1625',        /* main content area - slightly lighter */
          card: '#221c2e',      /* cards - medium purple-gray */
          sidebar: '#16121f',    /* sidebar - darker */
          border: '#2d2640',    /* borders, dividers */
          'border/50': 'rgba(45, 38, 64, 0.5)',
        },
        primary: {
          DEFAULT: '#7c3aed',   /* purple - buttons, accents */
          hover: '#6d28d9',
        },
        status: {
          enabled: '#22c55e',   /* green for ENABLED toggle */
          disabled: '#64748b',   /* gray for DISABLED */
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.15)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
}
