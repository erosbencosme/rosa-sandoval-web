import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  // Archivos de configuración: corren en Node, no en el navegador.
  // Necesitan globals de Node (process, __dirname…), que el bloque
  // de abajo no proporciona porque asume entorno de navegador.
  {
    files: ['*.config.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Este proyecto no usa eslint-plugin-react, así que la regla no
      // "ve" que un identificador se usa dentro de JSX (<Tag />, <Icon />).
      // Por eso se ignoran los nombres en PascalCase / MAYÚSCULAS, que por
      // convención son componentes o constantes:
      //   · varsIgnorePattern → const Icon = social.icon
      //   · argsIgnorePattern → function Reveal({ as: Tag })
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' },
      ],
    },
  },
])
