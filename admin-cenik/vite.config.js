import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: false,
    // Povolit přístup přes ngrok (a jiné hosty) – jinak Vite blokuje doménu
    allowedHosts: true,
  },
})
