import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ================================================================
// VITE CONFIG — Build para GitHub Pages + Dominio Personalizado
// ================================================================
//
// base: '/' → Los assets se sirven desde la raíz del dominio.
//   Esto es lo correcto cuando se usa un DOMINIO PERSONALIZADO en la
//   raíz (rosasandoval.com), servido vía CNAME en GitHub Pages.
//   El sitio se sirve desde https://rosasandoval.com/ (no un subdir),
//   por lo que las rutas absolutas (/assets/...) resuelven perfecto.
//
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // 🚀 Dominio personalizado en la raíz: rutas absolutas desde /
  base: '/',
})
