import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import BookDetail from './views/BookDetail';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Popup from './components/Popup';

// ================================================================
// App.jsx — SISTEMA DE ENRUTAMIENTO HASH PARA GITHUB PAGES
// ================================================================
//
// ¿Por qué Hash Routing?
// ─────────────────────────────────────────────────────────────────
// GitHub Pages es un hosting ESTÁTICO — no tiene un servidor que
// reescriba URLs. Si usamos BrowserRouter (react-router), al
// refrescar /libro el servidor devuelve 404 porque no existe
// el archivo /libro/index.html.
//
// Con Hash Routing, la URL se ve así:
//   https://rosasandoval.com/#/libro
//
// El navegador NUNCA envía lo que hay después del '#' al servidor,
// así que siempre carga index.html y JavaScript decide qué mostrar.
//
// Rutas soportadas:
//   #/libro        → Vista del libro (Método GPS)
//   cualquier otro → Home (incluyendo anchors como #pilares)
//
// Ventajas:
//   · Cero dependencias (no react-router)
//   · URLs compartibles (rosasandoval.com/#/libro)
//   · Refresco de página funciona perfectamente en GitHub Pages
//   · Las anchor-links de sección (#pilares, #contacto…) siguen
//     funcionando porque Navbar detecta la vista actual y hace
//     scroll con delay cuando cambia entre vistas.
// ================================================================

/**
 * getViewFromHash — Determina qué vista mostrar basándose en el hash.
 *
 * Si el hash comienza con '#/libro', mostramos la vista del libro.
 * Cualquier otro hash (incluyendo '#pilares', '#contacto', etc.)
 * muestra la vista Home.
 *
 * @returns {'home' | 'book'} La vista actual
 */
function getViewFromHash() {
    if (typeof window === 'undefined') return 'home';
    return window.location.hash.startsWith('#/libro') ? 'book' : 'home';
}

export default function App() {
    // Estado reactivo: la vista se actualiza cuando cambia el hash
    const [view, setView] = useState(getViewFromHash);

    useEffect(() => {
        /**
         * onHashChange — Listener del evento 'hashchange'.
         *
         * Cada vez que el hash cambia (clic en enlace, botón atrás, etc.),
         * recalculamos la vista. Si estamos entrando a la vista del libro,
         * hacemos scroll al tope para que el usuario vea el hero.
         */
        const onHashChange = () => {
            const next = getViewFromHash();
            setView((prev) => {
                // Scroll al tope solo cuando ENTRAMOS a la vista del libro
                if (next === 'book' && prev !== 'book') {
                    window.scrollTo({ top: 0, behavior: 'auto' });
                }
                return next;
            });
        };

        // Registrar listener al montar el componente
        window.addEventListener('hashchange', onHashChange);

        // Cleanup: remover listener al desmontar
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <>
            {/* Navbar recibe la vista actual para resaltar "El Libro" cuando estamos ahí */}
            <Navbar currentView={view} />

            <main>
                {/* Renderizado condicional: solo una vista a la vez */}
                {view === 'book' ? <BookDetail /> : <Home />}
            </main>

            <Footer />
            <WhatsAppButton />

            {/* Popup de intención de salida — sólo relevante en Home */}
            {view === 'home' && <Popup />}
        </>
    );
}
