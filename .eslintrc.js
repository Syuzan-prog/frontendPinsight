const settings = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@babel/eslint-parser',
    extends: [
        'airbnb',
    ],
    plugins: [
        'react',
        'react-hooks',
        'import',
    ],
    rules: {
        // core rules
        'linebreak-style': [
            'error',
            'unix',
        ],
        'padded-blocks': 'off',
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
            CallExpression: {
                arguments: 1,
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoredNodes: ['JSXElement', 'JSXElement *'],
        }],
        'no-console': [
            'error',
            {
                allow: [
                    'warn',
                    'error',
                    'trace',
                ],
            },
        ],
        'no-debugger': 'error',
        'max-len': [
            'error',
            {
                code: 120,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'no-shadow': [
            'error',
            {
                allow: [
                    'ui',
                ],
            },
        ],
        'no-underscore-dangle': 'off',
        'no-constant-condition': [
            'error',
            {
                checkLoops: false,
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'prefer-destructuring': 'off',
        'function-paren-newline': 'off',
        'implicit-arrow-linebreak': 'off',
        'object-curly-newline': 'off',
        'no-multi-assign': 'off',
        'no-await-in-loop': 'off',

        // react rules
        'react/jsx-indent': [
            'error',
            4,
        ],
        'react/jsx-indent-props': [
            'error',
            4,
        ],
        'react/jsx-wrap-multilines': [
            'warn',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ],
        'react/default-props-match-prop-types': ['error', {
            allowRequiredDefaults: true,
        }],
        'react/sort-comp': ['error', {
            order: [
                'static-methods',
                'type-annotations',
                'state',
                'instance-variables',
                'lifecycle',
                '/^handle.+$/',
                'getters',
                'setters',
                '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                'instance-methods',
                'everything-else',
                '/^render.+$/',
                'render',
            ],
            groups: {
                lifecycle: [
                    'constructor',
                    'getDefaultProps',
                    'state',
                    'getInitialState',
                    'getChildContext',
                    'getDerivedStateFromProps',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'getSnapshotBeforeUpdate',
                    'componentDidUpdate',
                    'componentDidCatch',
                    'componentWillUnmount',
                ],
            },
        }],
        'react/no-did-mount-set-state': 'off',
        'react/no-did-update-set-state': 'off',
        'react/destructuring-assignment': 'off',
        'react/require-default-props': 'off',
        'react/button-has-type': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // import rules
        'import/no-useless-path-segments': 'error',
        'import/no-internal-modules': ['error', {
            allow: ['**/!(index*)'],
        }],
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'src/jestsetup.js',
                    '*.test.js',
                    '*.test.jsx',
                    'webpack*js',
                ],
            },
        ],
        'import/extensions': ['error', {
            js: 'never',
            jsx: 'never',
            json: 'always',
            scss: 'always',
        }],
        'import/named': 'error',

        // jsx-a11y rules
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: [
                    'Link',
                ],
                specialLink: [
                    'to',
                ],
                aspects: [
                    'noHref',
                    'invalidHref',
                    'preferButton',
                ],
            },
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                components: [
                    'Label',
                ],
                required: {
                    every: [
                        'nesting',
                        'id',
                    ],
                },
                allowChildren: true,
            },
        ],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
    settings: {
        'import/parser': 'babel-eslint',
        'import/resolver': {
            webpack: {
                config: 'webpack/webpack.common',
            },
        },
    },
    globals: {
        APP_API_URL: true,
    },
};

if (process.env.NODE_ENV === 'development') {
    settings.rules = Object.assign(settings.rules, {
        'react/prop-types': ['warn'],
        'react/no-unused-prop-types': ['warn'],
        'no-unused-vars': ['warn'],
        'no-debugger': ['warn'],
        'no-console': [
            'warn',
            {
                allow: [
                    'warn',
                    'error',
                    'trace',
                ],
            },
        ],
    });
}

module.exports = settings;
