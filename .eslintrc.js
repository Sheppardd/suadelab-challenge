module.exports = {
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": [2, "double", { "avoidEscape": true }],
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "eol-last": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3,
        "allowFirstLine": true
      },      
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }]
  }
};
