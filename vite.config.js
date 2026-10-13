import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from a sub-path
  // (https://rupali140.github.io/rupali-protfolio-new/), not from the
  // domain root, so Vite needs to know that when it builds asset URLs.
  // Without this, index.html references /assets/... which 404s under the
  // sub-path and the page loads blank.
  base: '/rupali-protfolio-new/',
  build: {
    outDir: 'docs',
  },
})
