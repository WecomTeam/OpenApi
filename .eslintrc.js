module.exports = {
    "env": {
        "es2022": true,
        "node": true
    },
    "extends": "airbnb-base",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
        // error
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],
        // warn
        'import/first': 'warn', // import 放在文件头
        'spaced-comment': 'warn', // 注释要含有空格
        'camelcase': 'warn', // 驼峰命名
        'max-len': ['warn', { code: 150 }],
        'operator-assignment': 'warn',
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'eol-last': 'warn',
        'object-curly-spacing': 'warn',
        'no-return-assign': 'warn',
        // off
        'no-underscore-dangle': 'off',
        'object-curly-newline': 'off',
        'comma-dangle': 'off',
        'linebreak-style': 'off',
        'no-restricted-syntax': 'off',
        'radix': 'off',
        'consistent-return': 'off',
        'no-plusplus': 'off',
        'import/prefer-default-export': 'off',
        'arrow-parens': 'off',
        'semi': [2, 'always']
      }
}