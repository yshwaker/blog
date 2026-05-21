import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST

export default defineConfig({
  fmt: {
    ignorePatterns: ['src/lib/posts/**'],
    semi: false,
    singleQuote: true,
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    passWithNoTests: true,
  },
  staged: {
    '**/*.{md,mdx}': 'node scripts/updateDate',
  },
  publicDir: 'static',
  plugins: [
    ...(isTest ? [] : [cloudflare({ viteEnvironment: { name: 'ssr' } })]),
    tanstackStart(),
    viteReact(),
  ],
})
