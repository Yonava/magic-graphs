import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

const r = (...p: string[]) => path.resolve(__dirname, ...p);

export default defineConfig({
  plugins: [vue()],
  test: {
    silent: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@magic/graph": r("packages/graph/src"),
      "@magic/utils": r("packages/utils/src"),
      "@magic/ui": r("packages/ui/src"),
      "@magic/shapes": r("packages/shapes/src"),
      "@magic/canvas": r("packages/canvas/src"),
      "@magic/products": r("packages/products/src"),
    },
  },
});
