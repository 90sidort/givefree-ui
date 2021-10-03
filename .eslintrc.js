module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  globals: {
    cy: true,
    before: true,
    Cypress: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "jest"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": "off",
    "prettier/prettier": "error",
    "jsx-a11y/anchor-is-valid": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.js", "**/*.spec.js", "**/commands.js"] },
    ],
  },
};
