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
          "@magic/graph": r("../../graph/src"),
          "@magic/utils": r("../../utils/src"),
          "@magic/ui": r("../../ui/src"),
          "@magic/shapes": r("../../shapes/src"),
          "@magic/canvas": r("../../canvas/src"),
          "@magic/products": r("../../products/src"),
          vue: r("../../../node_modules/vue"),
          primevue: r("../../../node_modules/primevue"),
        },
      },
    });
  },
};
export default config;
