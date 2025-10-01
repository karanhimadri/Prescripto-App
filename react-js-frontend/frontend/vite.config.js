import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['f551-42-105-193-150.ngrok-free.app'], // Allow ngrok host
    port: 5173
  }
})
