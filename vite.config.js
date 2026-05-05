import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Import from '@/api', '@/hooks', '@/lib' etc.
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
