import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // opzionale, se vuoi usare `describe`, `it`, `expect` senza import
  },
})
