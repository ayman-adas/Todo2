import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { global } from 'global';
window.global = global;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
