import { useRoute, useDocumentMeta, ROUTES, FALLBACK_ROUTE } from './router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Popup from './components/Popup';

import Home from './pages/Home';
import SobreRosa from './pages/SobreRosa';
import ParaTi from './pages/ParaTi';
import SesionClaridad from './pages/SesionClaridad';
import ParaEmpresas from './pages/ParaEmpresas';
import GpsAbundancia from './pages/GpsAbundancia';
import Libro from './pages/Libro';
import Podcast from './pages/Podcast';
import Testimonios from './pages/Testimonios';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';

// ================================================================
// App.jsx — Composición del sitio
// ================================================================
//
// La lógica de navegación vive en router.jsx. Aquí solo decidimos
// qué página montar y qué "chrome" (navbar + footer) la envuelve.
//
// Chrome:
//   'full' → navbar y footer completos (casi todas las páginas)
//   'bare' → SIN navegación. Solo la Sesión de Claridad, porque el
//            documento la define como landing de conversión: quien
//            llega ahí desde un anuncio debe poder agendar sin
//            distraerse con el resto del sitio.
// ================================================================

/** Mapa ruta → componente de página */
const PAGES = {
  '/': Home,
  '/sobre-rosa': SobreRosa,
  '/para-ti': ParaTi,
  '/sesion-de-claridad': SesionClaridad,
  '/para-empresas': ParaEmpresas,
  '/gps-de-la-abundancia': GpsAbundancia,
  '/libro': Libro,
  '/podcast': Podcast,
  '/testimonios': Testimonios,
  '/blog': Blog,
  '/contacto': Contacto,
  '/privacidad': Privacidad,
  '/terminos': Terminos,
};

export default function App() {
  const route = useRoute();
  useDocumentMeta(route);

  const Page = PAGES[route] ?? PAGES[FALLBACK_ROUTE];
  const chrome = (ROUTES[route] ?? ROUTES[FALLBACK_ROUTE]).chrome;
  const isBare = chrome === 'bare';

  return (
    <>
      {!isBare && <Navbar currentRoute={route} />}

      <main>
        <Page />
      </main>

      {!isBare && <Footer />}

      {/* WhatsApp flotante — presente en TODAS las páginas, incluida la
          landing sin navegación: es un canal de contacto, no navegación. */}
      <WhatsAppButton />

      {/* Popup de intención de salida — solo en la Home, para no
          interrumpir a quien ya está leyendo una página de servicio
          ni a quien llegó a la landing de conversión. */}
      {route === '/' && <Popup />}
    </>
  );
}
