import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import priceWatcher from './price-watcher-plugin.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), priceWatcher()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
