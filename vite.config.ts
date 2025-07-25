import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "cee-tv-web",
        short_name: "CEE TV",
        start_url: ".",
        display: "standalone",
        background_color: "#1e2129",
        theme_color: "#F54632",
        description: "A modern movie and series web app.",
        icons: [
          {
            src: "/src/images/ceetv.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/src/images/ceetv.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
});
