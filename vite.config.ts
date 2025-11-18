import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The resolve alias part below is included to match the structure
  // that was likely causing the original build errors regarding 'path' and '__dirname'.
  resolve: {
    alias: {
      // FIX: __dirname is not available in ES modules. Use import.meta.url to derive the path.
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './'),
    },
  },
});
