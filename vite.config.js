import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Put Bootstrap into its own vendor chunk
          if (id.includes('node_modules/bootstrap')) {
            return 'vendor-bootstrap';
          }
          // Keep other heavy node_modules in a shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})