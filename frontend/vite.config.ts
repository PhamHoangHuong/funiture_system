import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': 'react-router-dom',
    }
  },
  optimizeDeps: {
    include: ['jquery', 'isotope-layout']
  }
})
