import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5238', // .NET API port
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure : false
      }
    }
  }
})