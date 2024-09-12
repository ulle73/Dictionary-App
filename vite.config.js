// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite-konfiguration för Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Detta gör att globala funktioner som `it` och `test` är tillgängliga
    environment: "jsdom",
    setupFiles: "./src/setuptest.js",
  },
});
