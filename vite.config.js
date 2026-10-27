import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Put Bootstrap into its own vendor chunk (its CSS loads after ours, which the site's look depends on)
          if (id.includes('node_modules/bootstrap')) {
            return 'vendor-bootstrap';
          }
          // React and the router are needed on every page. Other packages stay with the pages that use them,
          // so the home page doesn't download Mantine, Embla or styled-components.
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'vendor';
          }
        },
      },
    },
  },
})
