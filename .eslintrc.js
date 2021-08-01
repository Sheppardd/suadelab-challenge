module.exports = {
  "extends": [
    "plugin:vue/vue3-recommended",
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
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
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
