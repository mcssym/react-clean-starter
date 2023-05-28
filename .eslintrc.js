module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    overrides: [],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
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
        '@typescript-eslint/indent': 'off',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        semi: 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        'multine-ternary': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
