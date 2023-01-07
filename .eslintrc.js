module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    worker: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // configure eslint
    "eqeqeq": ["error", "always", { null: "never" }],
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-implicit-coercion": "error",
    "no-restricted-globals": ["error", ...require("eslint-restricted-globals")],
    "prefer-const": "off",
    // configure @typescript-eslint
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    // configure react
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": ["error", "never"],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": ["error", {}],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
