import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // This will map `global` to `window` in the browser
  },
  server: {
    host: '0.0.0.0', // Makes it accessible from other devices on the network
    port: 3000,       // Change this to the port you want
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
