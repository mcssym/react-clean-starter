const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const react = require('eslint-plugin-react');

module.exports = tseslint.config(
    {
        ignores: [
            ".husky",
            ".gitlab-ci.yml",
            "node_modules",
            "build",
            "bin",
            "coverage",
            "node",
            "*.d.ts",
            "eslint.config.js",
            "craco.config.js",
            "jest.config.js",
            "src/react-app-env.d.ts",
            "src/report-web-vitals.ts",
            "tailwind.config.js",
        ],
    },
    eslint.configs.recommended,
    {
        ...react.configs.flat.recommended,
        settings: {
            ...react.configs.flat.recommended.settings,
            react: {
                version: 'detect',
            },
        },
    },
    ...tseslint.configs.recommended,
    {
        ...require('eslint-config-love'),
        files: ['**/*.js', '**/*.ts'],
    },
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        rules: {
            'no-use-before-define': 'error',
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                    ignoredNodes: [
                        'FunctionExpression > .params[decorators.length > 0]',
                        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                    ],
                },
            ],
            '@typescript-eslint/class-methods-use-this': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/indent': 'off',
            'space-before-function-paren': 'off',
            '@typescript-eslint/space-before-function-paren': 'off',
            semi: 'off',
            '@typescript-eslint/semi': 'off',
            '@typescript-eslint/member-delimiter-style': 'off',
            'comma-dangle': ['error', 'only-multiline'],
            // '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
            'multiline-ternary': 'off',
            '@typescript-eslint/multiline-ternary': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn', // Warn instead of error
                {
                    vars: 'all', // Check all variables
                    args: 'all', // Check function arguments only if they are not used later
                    ignoreRestSiblings: true, // Ignore variables used in rest properties
                    caughtErrorsIgnorePattern: '^_', // Ignore caught errors that start with '_'
                    argsIgnorePattern: '^_', // Ignore unused function arguments that start with '_'
                    varsIgnorePattern: '^_', // Ignore unused variables that start with '_'
                },
            ],  // Avertir sur les variables inutilisées
            'no-console': 'off',  // Désactiver les avertissements liés à l'utilisation de console.log
            'react/prop-types': 'off',  // Désactiver la validation des prop-types dans React (utile si vous utilisez TypeScript)
            '@typescript-eslint/no-explicit-any': 'off',  // Désactiver la règle interdisant l'utilisation de `any` en TypeScript
        },
    },
);
