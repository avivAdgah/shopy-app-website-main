/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f0ff',
          100: '#ebe1ff',
          200: '#d5c2ff',
          300: '#b795ff',
          400: '#9761ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4a1a94',
          900: '#3c1678',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe1e4',
          200: '#ffc4cb',
          300: '#ff96a3',
          400: '#fb5d75',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9d1239',
          900: '#851237',
        },
        highlight: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        category: {
          electronics: '#6366f1',
          fashion: '#ec4899',
          home: '#f59e0b',
          sports: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08)',
        glow: '0 8px 30px -6px rgb(124 58 237 / 0.45)',
        'glow-accent': '0 8px 30px -6px rgb(244 63 94 / 0.45)',
      },
    },
  },
  plugins: [],
}
