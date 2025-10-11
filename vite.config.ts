import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./lib/__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "json-summary", "json", "html-spa"],
      thresholds: {
        lines: 50,
        branches: 50,
        functions: 50,
        statements: 50,
      },
      exclude: ["./example", "./vite.config.ts"],
    },
  },

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "lib/index.ts"),
        "jsx-runtime": resolve(__dirname, "lib/jsx-runtime.ts"),
        "jsx-dev-runtime": resolve(__dirname, "lib/jsx-dev-runtime.ts"),
        "2d": resolve(__dirname, "lib/2d/index.ts"),
      },
      fileName: (format, entry) =>
        `${entry === "index" ? "index" : `${entry}/index`}.${
          format === "es" ? "js" : "cjs"
        }`,
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
