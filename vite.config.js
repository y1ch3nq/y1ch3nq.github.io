import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        lrcVisualizer: resolve(projectRoot, "projects/lrc-visualizer/index.html"),
      },
    },
  },
});
