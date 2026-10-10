import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ================================================================
// VITE CONFIG
// ================================================================
//
// base — de dónde cuelgan los assets
// ─────────────────────────────────────────────────────────────────
//
//   DESARROLLO  → '/'
//     El servidor local sirve desde la raíz. Así http://localhost:5173
//     funciona directo, sin tener que escribir el subdirectorio a mano
//     cada vez.
//
//   BUILD       → '/rosa-sandoval-web/'
//     GitHub Pages sirve el sitio desde el subdirectorio del repo:
//       https://erosbencosme.github.io/rosa-sandoval-web/
//     Vite prefija este base a los assets procesados (JS/CSS), lo que
//     evita los 404 de rutas que apuntarían a la raíz del dominio.
//
// ⚠️ Los assets de public/ referenciados como string en runtime
//    (./logo.png, ./images/…) usan rutas RELATIVAS a propósito, para
//    resolver bien en ambos casos. No cambiarlas a rutas absolutas:
//    una ruta como "/logo.png" da 404 bajo el subdirectorio.
//
// ─────────────────────────────────────────────────────────────────
// PARA PASAR A DOMINIO PROPIO (rosasandoval.com)
//   1. Cambiar PROD_BASE a '/'
//   2. Crear public/CNAME con una sola línea: rosasandoval.com
//   3. Apuntar el DNS a GitHub Pages
// ─────────────────────────────────────────────────────────────────

const PROD_BASE = '/rosa-sandoval-web/'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],

  base: command === 'build' ? PROD_BASE : '/',

  server: {
    // Respeta la variable PORT si el entorno la define (herramientas de
    // vista previa, contenedores, CI). Si no, el 5173 de siempre.
    port: Number(process.env.PORT) || 5173,
  },
}))
