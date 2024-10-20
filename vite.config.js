import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.themealdb.com',
        changeOrigin: true,
        // Uklanjanje pathRewrite jer ga ne trebamo mijenjati
      },
    },
  },
});
