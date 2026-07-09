import type { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { mergeConfig } from "vite";

const r = (...p: string[]) => path.resolve(__dirname, ...p);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          "@graph/core/": r("../../graph-core/src"),
          "@core/utils": r("../../core-utils/src"),
          "@core/ui": r("../../core-ui/src"),
          "@canvas/primitives": r("../../canvas-primitives/src"),
          "@canvas/surface": r("../../canvas-surface/src"),
          "@magic/products": r("../../magic-products/src"),
        },
      },
    });
  },
};
export default config;
