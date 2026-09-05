import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import glsl from "vite-plugin-glsl";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [glsl()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        lrcVisualizer: resolve(projectRoot, "projects/lrc-visualizer/index.html"),
      },
    },
  },
});
