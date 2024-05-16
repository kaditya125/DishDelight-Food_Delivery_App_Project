import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  }
}
