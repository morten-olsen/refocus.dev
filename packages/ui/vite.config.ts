import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const ASSET_URL = process.env.ASSET_URL || '';

export default defineConfig({
  base: ASSET_URL ? `${ASSET_URL}/` : './',
  plugins: [react()],
});
