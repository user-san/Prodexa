import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Prodexa/', // 👈 must match your repo name exactly
  plugins: [react()],
})
