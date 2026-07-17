/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1a1a1a',
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#c8c8c8',
          300: '#a0a0a0',
          400: '#707070',
          500: '#505050',
          600: '#383838',
          700: '#282828',
          800: '#1a1a1a',
          900: '#0f0f0f',
        },
        ivory: {
          DEFAULT: '#f5f0e8',
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f5f0e8',
          300: '#ede4d4',
          400: '#e0d3bc',
          500: '#cfc0a4',
        },
        taupe: {
          DEFAULT: '#b8a898',
          light: '#d4c8bc',
          dark: '#8a7a6a',
        },
        bronze: {
          DEFAULT: '#a08060',
          light: '#c4a880',
          dark: '#7a6040',
          accent: '#b89060',
        },
        beige: '#e8ddd0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '7xl': ['5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['7rem', { lineHeight: '1' }],
        '10xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.3em',
        wider: '0.2em',
        wide: '0.15em',
      },
      transitionDuration: {
        800: '800ms',
        1200: '1200ms',
        1500: '1500ms',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'quad-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-expand': 'lineExpand 1s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { transform: 'scale(1.1)' },
          to: { transform: 'scale(1)' },
        },
        lineExpand: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/3': '4 / 3',
        '5/6': '5 / 6',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [],
}
