import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const ASSET_URL = process.env.ASSET_URL || '';

export default defineConfig({
  base: ASSET_URL ? `${ASSET_URL}/` : './',
  plugins: [react()],
  resolve: {
    alias: {
      fetch: 'isomorphic-fetch',
      stream: 'stream-browserify',
      path: 'path-browserify',
      os: 'os-browserify',
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});
