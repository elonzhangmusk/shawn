import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isVercel = Boolean(process.env.VERCEL)

  return {
    plugins: [react()],
    // GitHub Pages is served from /shawn/, while Vercel is served from /
    base: isVercel ? '/' : '/shawn/',
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three', '@react-three/fiber', '@react-three/drei'],
            'vendor': ['react', 'react-dom', 'react-router-dom']
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
