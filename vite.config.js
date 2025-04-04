import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    manifest: {
      name: 'Bancode',
      short_name: 'Bancode',
      description: 'Bancode uygulaması',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        },
        {
          src: 'logo.svg',
          sizes: '512x512',
          type: 'image/svg+xml'
        }
      ]
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
