import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        'dist/**',
        'vite.config.ts',
        'vitest.config.ts',
        'eslint.config.js',
        'src/main.tsx',
        'src/types/**',
        'src/api/**',
        'src/components/layout/**',
        'src/components/common/ProtectedRoute.tsx',
        'src/components/common/CookieBanner.tsx',
        'src/pages/Admin/**',
        'src/pages/Auth/**',
        'src/pages/Contact/**',
        'src/pages/Error/**',
        'src/pages/Rules/**',
        'src/pages/Shop/**',
        'src/pages/User/**',
        'src/pages/SiteMapPage.tsx',
        'src/routes/**',
      ],
    },
  },
})
