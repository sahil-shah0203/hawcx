import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ssl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    ssl()
  ],
  server: {
    host: true
  }
})
