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
// '/' en desarrollo y en producción, porque el sitio se sirve desde la
// RAÍZ del dominio:
//
//     Hoy (vista previa)  → https://<nombre>.netlify.app/
//     Mañana (definitivo) → https://rosasandoval.com/
//
// Al ser el mismo valor en los dos casos, migrar al hosting final no
// requiere tocar nada de esta configuración.
//
// ⚠️ HISTÓRICO — por qué esto antes era '/rosa-sandoval-web/'
//    El sitio se publicaba en GitHub Pages, que lo servía dentro del
//    subdirectorio del repositorio. Ese prefijo era obligatorio ahí.
//    Si algún día se vuelve a GitHub Pages, hay que restaurarlo; con
//    base '/' los assets darían 404 bajo el subdirectorio.
//    (El script `npm run deploy` del package.json sigue apuntando a
//     gh-pages, pero ya no es la vía de publicación.)
//
// ⚠️ Los assets de public/ referenciados como string en runtime
//    (./logo.png, ./images/…) usan rutas RELATIVAS. Funcionan igual
//    con cualquier base, así que no hace falta tocarlas.
//
// ─────────────────────────────────────────────────────────────────

const PROD_BASE = '/'

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
