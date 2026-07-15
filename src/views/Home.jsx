import Hero from '../components/Hero';
import Metodologia from '../components/Metodologia';
import Servicios from '../components/Servicios';
import Testimonios from '../components/Testimonios';
import Blog from '../sections/Blog';
import FAQ from '../components/FAQ';
import Formulario from '../components/Formulario';

/**
 * Home — Vista principal de rosasandoval.com
 *
 * Flujo actual (post-cleanup):
 *   1. Hero          — introducción a Rosa (foto + copy)
 *   2. Metodologia   — Ser · Hacer · Tener (timeline editorial)
 *   3. Servicios     — Mentoría · Talleres · Cursos online
 *   4. Testimonios   — Carrusel editorial (cream + silk)
 *   5. Blog          — Últimas publicaciones
 *   6. FAQ           — Preguntas frecuentes
 *   7. Formulario    — Sesión de claridad (contacto)
 *
 * ⛔ Eliminado del render tree:
 *   · Cursos / Formación (sección "Próxima formación") — retirada de la
 *     estrategia actual. El archivo sections/Cursos.jsx queda huérfano
 *     en disco; puede eliminarse manualmente cuando se confirme.
 */
export default function Home() {
    return (
        <>
            <Hero />
            <Metodologia />
            <Servicios />
            <Testimonios />
            <Blog />
            <FAQ />
            <Formulario />
        </>
    );
}
