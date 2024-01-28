import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";

export default defineConfig({
  base: "/Presentation_T-Systems_CSR/public/animations/",
  plugins: [
    motionCanvas({
      project: ["./src/project.ts"],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        dir: "../public/animations",
        entryFileNames: "[name].js",
      },
    },
  },
});
