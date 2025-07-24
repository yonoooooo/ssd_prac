import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginSecurity from "eslint-plugin-security";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      security: pluginSecurity
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",
    }
  },
  // Browser-specific config
  {
    files: ["src/public/**/*.js"],
    languageOptions: { 
      globals: globals.browser 
    }
  },
  // Node.js-specific config  
  {
    files: ["src/server.js", "src/utils/**/*.js"],
    languageOptions: { 
      globals: globals.node 
    }
  }
];