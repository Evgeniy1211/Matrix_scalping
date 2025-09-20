import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    pool: 'threads',
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
      include: ['client/src/**/*.{ts,tsx}', 'backend/schemas/**/*.ts'],
      exclude: [
        '**/*.d.ts',
        'node_modules/**',
        'dist/**',
        'coverage/**',
        'tests/**',
        'backend/**/vite.ts',
        'backend/**/routes.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'backend/schemas'),
    },
  },
});
