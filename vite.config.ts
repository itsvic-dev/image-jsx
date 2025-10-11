import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./lib/__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "json-summary", "json", "html-spa"],
    },
  },

  build: {
    lib: {
      entry: {
        default: resolve(__dirname, "lib/default.ts"),
        "jsx-runtime": resolve(__dirname, "lib/jsx-runtime.ts"),
        "2d": resolve(__dirname, "lib/2d/default.ts"),
      },
      fileName: (format, entry) => `${entry}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["skia-canvas"],
      output: {
        globals: {
          "skia-canvas": "Skia-Canvas",
        },
      },
    },
  },
});
