import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    headers: {
      "Content-Security-Policy": `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data: https: fonts.gstatic.com;
        connect-src 'self' https://bug-tracker-api.onrender.com;
      `
        .replace(/\s+/g, " ")
        .trim(),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Add CSP headers for production build
    headers: {
      "/*": {
        "Content-Security-Policy": `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          font-src 'self' data: https: fonts.gstatic.com;
          connect-src 'self' https://bug-tracker-api.onrender.com;
        `
          .replace(/\s+/g, " ")
          .trim(),
      },
    },
  },
  base: "/",
});
