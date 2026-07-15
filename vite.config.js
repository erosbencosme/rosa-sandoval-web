import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ================================================================
// VITE CONFIG — Build para GitHub Pages (STAGING / subdirectorio)
// ================================================================
//
// base: '/rosa-sandoval-web/' → El sitio se sirve desde el subdirectorio
//   del repositorio en GitHub Pages:
//     https://erosbencosme.github.io/rosa-sandoval-web/
//   Vite prefija este base a todos los assets procesados (JS/CSS),
//   evitando 404 por rutas que apuntarían a la raíz del dominio.
//
//   ⚠️ Los assets de public/ referenciados como string en runtime
//      (logo.png, images/book-cover.jpg) usan rutas RELATIVAS
//      (./logo.png, ./images/...) para resolver bien bajo este subdir.
//
//   Para volver a dominio personalizado en la raíz: base: '/'
//
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // 🚀 GitHub Pages staging: servido desde /rosa-sandoval-web/
  base: '/rosa-sandoval-web/',
})
