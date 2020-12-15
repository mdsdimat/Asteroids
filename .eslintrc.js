module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "settings":{
        "import/resolver": {
            "node": {
                "paths": ["src"],
                "extensions": [".ts", ".js"]
            }
        }
    },
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "ignorePatterns": [
        "node_modules"
    ],
    "rules": {
        "no-unused-vars": 2,
        "max-params": [2, 3],
        "indent": ["error", 4],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "ts": "never",
            }
        ],
        "no-underscore-dangle": 0,
        "camelcase": 0,
        "linebreak-style": 0,
        "class-methods-use-this": 0,
        '@typescript-eslint/no-non-null-assertion': 'off',
        "no-continue": 0,
        "no-param-reassign": 0,
        "no-undef": 0,
        "no-loop-func": 0,
        "no-use-before-define": 0,
        "no-shadow": 0,
        "react/static-property-placement": "off",
        "no-restricted-syntax": "off",
        "no-prototype-builtins": "off",
        '@typescript-eslint/no-var-requires': 0
    }
};
