// @ts-check
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Global ignores: prevent ESLint from parsing built artifacts and config outputs
  {
    ignores: [
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/public/**',
      '**/attached_assets/**',
      '**/*.min.*',
      '**/*.bundle.js',
      '**/*.vendor.js',
      '**/*.generated.*',
      // Common config files that shouldn't be linted
      '**/prettier.config.*',
      '**/postcss.config.*',
      '**/tailwind.config.*',
      '**/vite.config.*',
    ],
    settings: { react: { version: 'detect' } },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // Disable formatting-related ESLint rules in favor of Prettier
  eslintConfigPrettier,
  {
    // Limit linting to actual source files
    files: ['index.ts', 'backend/**/*.{ts,tsx,js,jsx}', 'client/src/**/*.{ts,tsx,js,jsx}'],
    settings: { react: { version: 'detect' } },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // React JSX runtime (no need to import React in scope)
      'react/react-in-jsx-scope': 'off',
      // Disable prop-types in TypeScript projects
      'react/prop-types': 'off',
      // Permit quotes/apostrophes in text content
      'react/no-unescaped-entities': 'off',

      // Let TypeScript handle undefined checks; avoid false positives
      'no-undef': 'off',

      // Prefer TS variant of unused-vars and allow underscore-prefixed values
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Keep explicit-any as a warning for now
      '@typescript-eslint/no-explicit-any': 'warn',

      // Use automatic import sorting and removal of unused imports
      'import/order': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Packages. React first, then other packages.
            ['^react$', '^@?\\w'],
            // Internal aliases (TS/webpack aliases like @/).
            ['^@/'],
            // Relative imports.
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
    },
  }
);
