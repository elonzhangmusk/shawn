/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00d4ff',
        'electric-purple': '#bd00ff',
        'cyber-blue': '#0a0a1a',
        'matrix-green': '#00ff41',
        'hologram-pink': '#ff00ff',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff' 
          },
          '50%': { 
            boxShadow: '0 0 40px #00d4ff, 0 0 80px #00d4ff, 0 0 120px #00d4ff' 
          },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        particle: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--tx), var(--ty))' },
        }
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}