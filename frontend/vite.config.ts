import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,//biar bisa akses dilokal
    port: 5173,//yakin port benar
    strictPort: true,//kalo port dipakai ga cari yang lain
    hmr: {
      overlay:false,//matikan error dibrowser
    }
  },
})
