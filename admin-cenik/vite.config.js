import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
      },
    },
  },
  server: {
    host: 'localhost',
    port: 5174,
    strictPort: false,
    // Povolit přístup přes ngrok (a jiné hosty) – jinak Vite blokuje doménu
    allowedHosts: true,
  },
})
