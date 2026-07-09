// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config({ ignores: ["*.d.ts", "**/coverage", "**/dist"] }, {
  extends: [
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...eslintPluginVue.configs["flat/recommended"],
  ],
  files: ["**/*.{ts,vue}"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: globals.browser,
    parserOptions: {
      parser: typescriptEslint.parser,
    },
  },
  rules: {
    "@typescript-eslint/no-empty-object-type": "off", // allows type MyType = {}
    "@typescript-eslint/no-explicit-any": "off",
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "CONDITIONALS", // v-if, v-else-if
          "LIST_RENDERING", // v-for
          "UNIQUE", // ref, key, v-slot
          "TWO_WAY_BINDING", // v-model
          "RENDER_MODIFIERS", // v-once, v-pre
          "DEFINITION", // is, v-is
          "EVENTS", // @click, @change
          "GLOBAL", // id
          "CONTENT", // class, style
          "OTHER_DIRECTIVES", // other v- directives
          "OTHER_ATTR", // all other attributes
        ],
        alphabetical: false,
      },
    ],
  },
}, eslintConfigPrettier, storybook.configs["flat/recommended"]);
