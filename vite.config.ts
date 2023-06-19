import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@admin': fileURLToPath(new URL('./src/features/admin', import.meta.url)),
      '@buyer': fileURLToPath(new URL('./src/features/buyer', import.meta.url)),
    },
  },
})
