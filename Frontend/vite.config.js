import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:3000',  // Your backend server
        changeOrigin: true,
        secure: false, 
      },
      '/api': {
        target: 'http://localhost:3000', // Your Express backend
        changeOrigin: true,
        secure: false, 
      },
      '/images': {
        target: 'http://localhost:3000', // Your Express backend
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});
