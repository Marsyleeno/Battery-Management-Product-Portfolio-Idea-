import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This tells GitHub Pages where to host your assets
  base: '/Battery-Management-Product-Portfolio-Idea-/', 
  
  plugins: [react()],
  
  // This keeps your local development working with your .NET backend
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5238', // .NET API port
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false
      }
    }
  }
})