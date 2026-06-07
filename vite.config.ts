import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      allow: [path.resolve(import.meta.dirname)],
      deny: ["**/.*"],
    },
    watch: {
      ignored: [
        "**/attached_assets/Pasted-*",
        "**/attached_assets/Screenshot*",
        "**/attached_assets/IMG_*",
        "**/attached_assets/image_*",
        "**/attached_assets/*.mp4",
        "**/attached_assets/*.csv",
        "**/attached_assets/*.eps",
        "**/attached_assets/*.md",
        "**/output/**",
        "**/tmp/**",
        "**/pdfs/**",
      ],
    },
  },
});
