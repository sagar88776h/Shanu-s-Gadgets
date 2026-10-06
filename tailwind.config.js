/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#ffffff',
          canvas: '#fbfbfd',
          surface: '#f5f5f7',
          card: '#ffffff',
          text: '#1d1d1f',
          gray: '#86868b',
          darkgray: '#6e6e73',
          lightgray: '#d2d2d7',
          border: 'rgba(0, 0, 0, 0.08)',
          blue: '#0071e3',
          blueHover: '#0077ed',
          gold: '#c99026',
        },
        dark: {
          950: '#030304',
          900: '#070709',
          850: '#0d0d11',
          800: '#14141b',
          700: '#1d1d27',
          600: '#2b2b3a',
        },
        brand: {
          gold: '#c99026',
          amber: '#f59e0b',
          neon: '#0ea5e9',
          blue: '#0071e3',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', '"SF Pro Display"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floating 7s ease-in-out infinite',
        'float-reverse': 'floatingRev 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.5deg)' },
        },
        floatingRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-0.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
