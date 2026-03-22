import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      prettier: prettier,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
