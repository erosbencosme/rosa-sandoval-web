// ================================================================
// router.jsx — MICRO-ROUTER POR HASH
// ================================================================
//
// ¿Por qué hash routing y no react-router?
// ─────────────────────────────────────────────────────────────────
// GitHub Pages es hosting ESTÁTICO: no hay servidor que reescriba
// URLs. Con BrowserRouter, refrescar /sobre-rosa devuelve 404 porque
// no existe el archivo /sobre-rosa/index.html.
//
// Con hash routing la URL se ve así:
//     https://rosasandoval.com/#/sobre-rosa
//
// El navegador NUNCA envía al servidor lo que va después del '#',
// así que siempre carga index.html y el JS decide qué mostrar.
//
// ⚠️ COSTO CONOCIDO — SEO:
//    Los buscadores indexan una sola URL. Si más adelante el blog
//    necesita posicionar por artículo (está en el plan de la
//    clienta), hay que migrar a BrowserRouter + un host con
//    fallback SPA (Netlify, Vercel, Cloudflare Pages — todos gratis).
//
//    Ese cambio está AISLADO EN ESTE ARCHIVO. El resto del sitio usa
//    <Link to="..."> y useRoute(), que no cambian. Migrar significa
//    reescribir solo este módulo.
// ================================================================

import { useState, useEffect } from 'react';

/** Altura del navbar fijo — se descuenta al hacer scroll a una sección */
export const NAV_OFFSET = 80;

// ─────────────────────────────────────────────────────────────────
// Tabla de rutas
// ─────────────────────────────────────────────────────────────────
//
// chrome: 'full' → con navbar y footer completos
//         'bare' → landing de conversión, SIN navegación
//                  (Sesión de Claridad, según el documento)
//
export const ROUTES = {
  '/': {
    title: 'Rosa Sandoval Polanco — Personas que crecen. Decisiones que transforman.',
    description:
      'Te acompaño a desarrollar una relación más consciente con el dinero, contigo misma y con los resultados que quieres construir. Educación financiera, desarrollo personal y liderazgo.',
    chrome: 'full',
  },
  '/sobre-rosa': {
    title: 'Sobre Rosa — Una vida de aprendizaje, servicio y propósito',
    description:
      'Rosa Sandoval Polanco: docente, facilitadora, coach, conferencista y escritora. Creadora de la metodología GPS de la Abundancia®.',
    chrome: 'full',
  },
  '/para-ti': {
    title: 'Para Ti — Mentoría individual | Rosa Sandoval Polanco',
    description:
      'Un espacio para transformar tu relación con el dinero y liderar tus resultados. Mentoría individual con sesión de claridad gratuita.',
    chrome: 'full',
  },
  '/sesion-de-claridad': {
    title: 'Sesión de Claridad — 30 minutos sin costo | Rosa Sandoval Polanco',
    description:
      '30 minutos para conversar sobre dónde estás y qué necesitas transformar. Sin costo ni compromiso.',
    chrome: 'bare',
  },
  '/para-empresas': {
    title: 'Para Empresas — Desarrollo personas. Fortalezco equipos.',
    description:
      'Conferencias, talleres y programas formativos para organizaciones que desean fortalecer el bienestar, las competencias y el desempeño de sus colaboradores.',
    chrome: 'full',
  },
  '/gps-de-la-abundancia': {
    title: 'GPS de la Abundancia® — Ser, Hacer y Tener',
    description:
      'Una metodología para aprender a dirigir tu vida desde el SER, el HACER y el TENER.',
    chrome: 'full',
  },
  '/libro': {
    title: 'El Libro — GPS de la Abundancia | Rosa Sandoval Polanco',
    description:
      'Una ruta para transformar tu relación con el dinero desde el SER, el HACER y el TENER.',
    chrome: 'full',
  },
  '/podcast': {
    title: 'Nuestro Espacio Podcast — Conversaciones para pensar, crecer y transformar',
    description:
      'Conversaciones y reflexiones sobre dinero, desarrollo personal, liderazgo, propósito, emprendimiento y vida.',
    chrome: 'full',
  },
  '/testimonios': {
    title: 'Testimonios — Lo que dicen quienes han vivido la experiencia',
    description:
      'Testimonios de mentoría, conferencias y talleres, empresas y educación financiera.',
    chrome: 'full',
  },
  '/blog': {
    title: 'Blog — Dinero con propósito, desarrollo personal y liderazgo',
    description:
      'Artículos sobre finanzas personales, mentalidad, liderazgo y desarrollo de equipos. Incluye Café con Rosa.',
    chrome: 'full',
  },
  '/contacto': {
    title: 'Contacto — Hablemos | Rosa Sandoval Polanco',
    description:
      '¿Tienes una pregunta, quieres trabajar conmigo o deseas llevar una experiencia a tu organización? Estoy aquí para escucharte.',
    chrome: 'full',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Rosa Sandoval Polanco',
    description: 'Cómo se recogen, usan y protegen los datos personales en este sitio.',
    chrome: 'full',
  },
  '/terminos': {
    title: 'Términos de Uso | Rosa Sandoval Polanco',
    description: 'Condiciones de uso del sitio rosasandoval.com.',
    chrome: 'full',
  },
};

/** Ruta a la que caemos cuando el hash no corresponde a ninguna ruta conocida */
export const FALLBACK_ROUTE = '/';

// ─────────────────────────────────────────────────────────────────
// Lectura y escritura del hash
// ─────────────────────────────────────────────────────────────────

/**
 * getRouteFromHash — Traduce window.location.hash a una ruta válida.
 *
 * Acepta:
 *   ''            → '/'
 *   '#/'          → '/'
 *   '#/para-ti'   → '/para-ti'
 *   '#/para-ti/'  → '/para-ti'   (barra final tolerada)
 *   '#cualquier'  → '/'          (anclas viejas siguen cayendo en Home)
 */
export function getRouteFromHash() {
  if (typeof window === 'undefined') return FALLBACK_ROUTE;

  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '/') return '/';

  // Anclas legacy sin barra (#contacto) → Home
  if (!raw.startsWith('/')) return FALLBACK_ROUTE;

  // Normaliza barra final: '/para-ti/' → '/para-ti'
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw;

  return Object.prototype.hasOwnProperty.call(ROUTES, path) ? path : FALLBACK_ROUTE;
}

/**
 * navigate — Cambia de ruta.
 *
 * Usa pushState + un evento 'hashchange' sintético para que la
 * navegación sea instantánea y el botón "atrás" del navegador
 * siga funcionando.
 *
 * @param {string} path  Ruta destino, ej. '/para-empresas'
 */
export function navigate(path) {
  const target = `#${path}`;
  if (window.location.hash === target) {
    // Ya estamos ahí: subimos al tope en vez de no hacer nada
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.history.pushState(null, '', target);
  window.dispatchEvent(new Event('hashchange'));
}

/**
 * scrollToId — Scroll suave a una sección DENTRO de la página actual.
 *
 * No toca la URL a propósito: las anclas internas no son rutas y no
 * deben ensuciar el historial de navegación.
 */
export function scrollToId(id) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - NAV_OFFSET, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────────────
// Hook principal
// ─────────────────────────────────────────────────────────────────

/**
 * useRoute — Devuelve la ruta activa y se re-renderiza al cambiar.
 *
 * Además hace scroll al tope en cada cambio de ruta, que es lo que
 * espera cualquiera al navegar entre páginas distintas.
 */
export function useRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const onChange = () => {
      const next = getRouteFromHash();
      setRoute((prev) => {
        if (next !== prev) window.scrollTo({ top: 0, behavior: 'auto' });
        return next;
      });
    };

    window.addEventListener('hashchange', onChange);
    window.addEventListener('popstate', onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
      window.removeEventListener('popstate', onChange);
    };
  }, []);

  return route;
}

/**
 * useDocumentMeta — Sincroniza <title> y meta description con la ruta.
 *
 * Con hash routing los buscadores no ven estas variantes, pero sí las
 * ve el usuario en la pestaña y el historial, y quedan listas para
 * cuando se migre a rutas reales.
 */
export function useDocumentMeta(route) {
  useEffect(() => {
    const meta = ROUTES[route] ?? ROUTES[FALLBACK_ROUTE];
    document.title = meta.title;

    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', meta.description);
  }, [route]);
}
