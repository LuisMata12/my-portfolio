import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Sitio multipágina: sin esto, Vite solo compila index.html
// y projects.html da 404 en producción.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
      },
    },
  },
})
