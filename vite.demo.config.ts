import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "demo",
  base: "./",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../live-demo",
    emptyOutDir: true,
  },
});
