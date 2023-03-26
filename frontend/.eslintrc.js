module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "standard"
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "react"
    ],
    rules: {
        "no-extra-parens": [
            "warn",
            "all",
            {
                nestedBinaryExpressions: false,
                returnAssign: false,
                enforceForArrowConditionals: false,
                ignoreJSX: "all"
            }
        ],
        "brace-style": ["error", "1tbs"],
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};
