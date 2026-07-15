import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ================================================================
// VITE CONFIG — Configuración de build para GitHub Pages
// ================================================================
//
// base: './' → Todas las rutas de assets se generan como relativas.
//   Esto es ESENCIAL para GitHub Pages, que sirve desde un subdirectorio
//   (e.g., https://usuario.github.io/mi-repo/).
//   Sin esto, los assets apuntan a la raíz (/) y dan 404.
//
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // 🚀 GitHub Pages: usar rutas relativas para todos los assets
  base: './',
})
