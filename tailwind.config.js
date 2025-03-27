/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // More saturated indigo
          light: '#6366f1',   // Brighter mid-tone
          dark: '#3730a3'     // Rich dark tone
        },
        secondary: {
          DEFAULT: '#06b6d4', // Vibrant cyan
          light: '#22d3ee',   // Bright cyan
          dark: '#0891b2'     // Deep cyan
        },
        accent: '#f43f5e',    // Bright pink
        electric: {
          DEFAULT: '#facc15', // Vibrant yellow
          light: '#fde047',   // Light yellow
          dark: '#eab308'     // Deep yellow
        },
        neon: {
          DEFAULT: '#a855f7', // Vibrant purple
          light: '#c084fc',   // Light purple
          dark: '#9333ea'     // Deep purple
        },
        tropical: {
          DEFAULT: '#fb7185', // Vibrant coral
          light: '#fda4af',   // Light coral
          dark: '#e11d48'     // Deep coral/red
        },
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',  
          500: '#64748b',  
          600: '#475569',  
          700: '#334155',  
          800: '#1e293b',  
          900: '#0f172a'   // Darkest
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}