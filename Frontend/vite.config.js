import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2000,
    proxy: {
      '/api': {
        target: 'https://website-s9ue.onrender.com',
        changeOrigin: true
      }
    }
  }
})
