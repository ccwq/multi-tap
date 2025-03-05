import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/multi-tap.js',
      name: 'MultiTap',
      fileName: (format) => `multi-tap.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    },
    minify: true,
    sourcemap: true
  }
});