import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
      workbox:{
        cleanupOutdatedCaches:true,
        maximumFileSizeToCacheInBytes: 5000000,
        clientsClaim:true,
        skipWaiting:true,
      },
      manifest: {
        background_color: "#ffffff",
        description: "Finanzas para desorganizados",
        dir: "ltr",
        display: "standalone",
        name: "Awanta",
        orientation: "any",
        scope: "/",
        short_name: "Awanta",
        start_url: "/",
        icons: [
          {
            src: "/icons/192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any"
          },
          {
            src: "/icons/512.png",
            type: "image/png",
            sizes: "512x512"
          }
      
        ],
        display_override: [
          "standalone"
        ]
      }
    })
  ],
})
