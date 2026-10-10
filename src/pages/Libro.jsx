import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BOOK } from '../constants';
import Link from '../components/Link';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

/**
 * BuyButton — CTA de compra con estado.
 *
 * ⚠️ Mientras BOOK.onSale sea false, NO enlazamos a Amazon: la
 * constante AMAZON_BOOK_LINK todavía apunta a un ASIN de ejemplo y
 * mandaría al visitante a una página inexistente. En su lugar
 * mostramos el estado real del libro.
 *
 * Al publicar: poner el enlace real en AMAZON_BOOK_LINK y
 * BOOK_ON_SALE = true en constants.js. Los dos botones de esta
 * página se activan solos.
 */
function BuyButton({ onDark = false }) {
    const classes = `btn-luxury ${onDark ? 'btn-luxury--onDark' : ''}`;

    if (!BOOK.onSale) {
        return (
            <div className="inline-flex flex-col gap-3">
                <span
                    className={`${classes} pointer-events-none opacity-55`}
                    aria-disabled="true"
                >
                    <span>Próximamente en Amazon</span>
                    <span className="btn-luxury-dot" aria-hidden="true" />
                </span>
                <span className={`font-mono text-[10px] tracking-[0.18em] uppercase
                    ${onDark ? 'text-sand/45' : 'text-olive-dark/45'}`}>
                    Fecha de publicación por anunciar
                </span>
            </div>
        );
    }

    return (
        <a href={BOOK.amazonUrl} target="_blank" rel="noopener noreferrer" className={classes}>
            <span>Comprar en Amazon</span>
            <span className="btn-luxury-dot" aria-hidden="true" />
        </a>
    );
}

// ================================================================
// Libro.jsx — Vista dedicada del libro "GPS de la Abundancia"
// ================================================================
//
// Flujo visual:
//   1. Hero editorial (portada real + título Fraunces + btn-luxury Amazon)
//   2. Spec Catalog Card — ficha del libro tipo library card
//   3. Blueprint · Ser · Hacer · Tener (coordenadas)
//   4. Cita de la tesis
//   5. Elogios tempranos
//   6. CTA final Amazon
//
// Portada:
//   Usa BOOK.coverSrc (definido en constants.js).
//   Si la imagen falla (404, GitHub Pages misconfiguration, etc.),
//   se muestra un fallback tipográfico elegante en React state
//   para que el sitio NUNCA se vea roto.
//
// Todos los enlaces de Amazon vienen de BOOK.amazonUrl (constants.js).
// ================================================================

/**
 * Elogios tempranos sobre el libro.
 *
 * ⚠️⚠️ PLACEHOLDER — igual que los testimonios de content.js.
 *
 * Estos tres nombres (Carmen V., Isabel M., Julia S.) NO corresponden
 * a personas reales: venían de la maqueta original. Publicar elogios
 * atribuidos a personas inventadas es un riesgo reputacional evidente,
 * y más en un libro que se va a vender.
 *
 * Antes de publicar el libro:
 *   · Reemplazar con lectores reales que hayan autorizado su cita, o
 *   · Poner PRAISE_PENDING = true para ocultar la sección entera.
 *
 * Mientras el libro no esté a la venta (BOOK.onSale === false), la
 * sección se oculta automáticamente: no tiene sentido mostrar reseñas
 * de una obra que todavía nadie ha podido leer.
 */
const PRAISE_PENDING = true;

const bookPraise = [
    {
        text: 'Un manual íntimo que reordena la relación con el dinero desde la raíz. Rosa escribe con la calma de quien caminó el mapa antes de dibujarlo.',
        by: 'Nombre por confirmar',
        role: 'Lectura anticipada',
    },
    {
        text: 'Convierte la conversación más incómoda —el dinero— en un ejercicio de conciencia y ternura. Difícil dejarlo en la mesita de noche.',
        by: 'Nombre por confirmar',
        role: 'Lectura anticipada',
    },
    {
        text: 'No es un libro de finanzas. Es una brújula interior para la vida que quieres construir, con la disciplina para llegar hasta ahí.',
        by: 'Nombre por confirmar',
        role: 'Lectura anticipada',
    },
];

/** ¿Mostrar la sección de elogios? Solo con contenido real y libro publicado. */
const showPraise = !PRAISE_PENDING && BOOK.onSale;

/** Especificaciones técnicas del libro */
const specs = [
    { label: 'Edición', value: BOOK.edition },
    { label: 'Publicación', value: BOOK.year },
    { label: 'Páginas', value: String(BOOK.pages) },
    { label: 'Idioma', value: 'Español' },
    { label: 'Formato', value: 'Tapa blanda' },
    { label: 'ISBN', value: BOOK.isbn },
];

export default function Libro() {
    // Intersection observers para animaciones de entrada
    const [specRef, specVisible] = useIntersectionObserver({ threshold: 0.2 });
    const [pillarsRef, pillarsVisible] = useIntersectionObserver({ threshold: 0.15 });
    const [praiseRef, praiseVisible] = useIntersectionObserver({ threshold: 0.15 });
    const [ctaRef, ctaVisible] = useIntersectionObserver({ threshold: 0.25 });

    // Estado para el fallback de la portada (React state, no DOM manipulation)
    const [coverError, setCoverError] = useState(false);

    return (
        <article style={{ background: 'var(--color-sand)' }}>

            {/* ═══ HERO EDITORIAL ═══════════════════════════════════ */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
                {/* Hairline marginal — detalle editorial sutil */}
                <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10"
                />

                <div className="max-w-[1400px] mx-auto px-[6%]">
                    {/* Enlace "Volver al inicio" */}
                    <div className="mb-14">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 font-ui text-xs uppercase
                tracking-[0.15em] text-olive-dark/60 no-underline
                transition-colors duration-500 hover:text-olive-dark"
                        >
                            <ArrowLeft
                                size={13}
                                aria-hidden="true"
                                className="transition-transform duration-500 group-hover:-translate-x-1"
                            />
                            Volver al inicio
                        </Link>
                    </div>

                    <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-start">

                        {/* ── Columna título · 7/12 ── */}
                        <div className="col-span-12 md:col-span-7 animate-fadeInUp">
                            <div className="flex items-center gap-4 mb-10 font-mono text-[11px]
                tracking-[0.28em] uppercase text-olive-dark/55">
                                <span
                                    aria-hidden="true"
                                    className="block w-10 h-px"
                                    style={{ background: 'var(--color-gilt)' }}
                                />
                                <span>Un libro de {BOOK.author}</span>
                                <span aria-hidden="true" className="text-olive-dark/25">·</span>
                                <span>{BOOK.year}</span>
                            </div>

                            {/* El título sale de BOOK (constants.js): antes estaba
                                escrito a mano como "Método GPS", que no es el nombre
                                de la marca. La marca registrada es
                                "GPS de la Abundancia®". */}
                            <h1 className="font-display text-olive-dark leading-[0.9] tracking-tight m-0">
                                <span className="block text-[clamp(2.5rem,7.5vw,5.5rem)] font-light">
                                    GPS de la
                                </span>
                                <span className="block text-[clamp(2.5rem,7.5vw,5.5rem)] italic font-normal text-olive">
                                    Abundancia
                                </span>
                                <span className="block mt-6 text-[clamp(1.25rem,2.4vw,1.85rem)]
                   font-body italic font-light text-olive-dark/70 tracking-normal">
                                    {BOOK.subtitle}.
                                </span>
                            </h1>

                            <p className="mt-12 max-w-[38ch] text-lg md:text-xl leading-[1.7] text-olive-dark/85">
                                Hablar de dinero es hablar de historias, raíces y sueños —
                                no de números. Un mapa interior para reorientar tu relación
                                con la abundancia, del{' '}
                                <em className="not-italic font-medium text-olive-dark">Ser</em>, al{' '}
                                <em className="not-italic font-medium text-olive-dark">Hacer</em>, al{' '}
                                <em className="not-italic font-medium text-olive-dark">Tener</em>.
                            </p>

                            <div className="mt-14">
                                <BuyButton />
                            </div>
                        </div>

                        {/* ── Columna portada · 5/12 ─────────────────────────
                             Portada REAL del libro con fallback elegante.
                             
                             La imagen viene de BOOK.coverSrc (constants.js).
                             Si falla la carga (404, ruta incorrecta, etc.),
                             React state activa un fallback tipográfico
                             que mantiene el diseño editorial intacto.
                             
                             Micro-interacciones:
                             · hover:scale-[1.02] — lift sutil
                             · hover:-rotate-1 — tilt elegante
                             · transition-all duration-700 — movimiento suave
                             ─────────────────────────────────────────────── */}
                        <div className="col-span-12 md:col-span-5 md:mt-8 lg:mt-16 animate-fadeInUp delay-200">
                            <div className="relative aspect-[3/4] max-w-[380px] mx-auto
                md:mx-0 md:ml-auto md:-mr-4 lg:-mr-8 xl:-mr-14">

                                {/* Placa beige — efecto de profundidad detrás de la portada */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 translate-x-5 translate-y-5 rounded-lg"
                                    style={{ background: 'color-mix(in srgb, var(--color-beige-light) 70%, transparent)' }}
                                />

                                {/* Portada con micro-interacciones premium */}
                                <div
                                    className="relative w-full h-full animate-drift
                                        transition-all duration-700 ease-out
                                        hover:scale-[1.02] hover:-rotate-1"
                                    style={{ transformOrigin: 'center' }}
                                >
                                    {/* ── Imagen real de la portada ── */}
                                    {!coverError ? (
                                        <img
                                            src={BOOK.coverSrc}
                                            alt={`Portada del libro ${BOOK.title}: ${BOOK.subtitle}, por ${BOOK.author}`}
                                            className="w-full h-full object-cover rounded-lg
                                                shadow-[0_45px_90px_-24px_rgba(28,45,31,0.45)]
                                                transition-shadow duration-700
                                                hover:shadow-[0_55px_110px_-24px_rgba(28,45,31,0.55)]"
                                            loading="eager"
                                            onError={() => setCoverError(true)}
                                        />
                                    ) : (
                                        /* ── Fallback tipográfico elegante ──
                                           Se activa si la imagen no carga (404, etc.).
                                           Mantiene la estética editorial del sitio
                                           para que NUNCA se vea un ícono roto. */
                                        <div
                                            className="absolute inset-0 flex flex-col items-center
                                                justify-center p-8 text-center rounded-lg
                                                shadow-[0_45px_90px_-24px_rgba(28,45,31,0.45)]"
                                            style={{
                                                background: 'var(--color-rich)',
                                                color: 'var(--color-sand)',
                                            }}
                                        >
                                            <div
                                                className="font-mono text-[10px] tracking-[0.25em]
                                                    uppercase opacity-60 mb-6"
                                            >
                                                {BOOK.author} · {BOOK.year}
                                            </div>
                                            <div
                                                className="font-display font-light leading-[1.05]"
                                                style={{ fontSize: '1.9rem' }}
                                            >
                                                GPS de la
                                            </div>
                                            <div
                                                className="font-display font-normal italic leading-[1.05]"
                                                style={{
                                                    fontSize: '1.9rem',
                                                    color: 'var(--color-gilt)',
                                                }}
                                            >
                                                Abundancia
                                            </div>
                                            <div
                                                className="font-body italic opacity-85 mt-4"
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {BOOK.subtitle}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SPEC CATALOG CARD ════════════════════════════════ */}
            <section
                ref={specRef}
                className="pt-4 pb-24 md:pt-8 md:pb-32"
                style={{ background: 'var(--color-sand)' }}
            >
                <div className="max-w-4xl mx-auto px-[6%]">
                    <div
                        className={`relative transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              ${specVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        {/* Marco de la ficha */}
                        <div
                            className="relative overflow-hidden rounded-md"
                            style={{
                                background: 'var(--color-silk)',
                                border: '1px solid rgba(28, 45, 31, 0.12)',
                                boxShadow: '0 20px 60px -30px rgba(28, 45, 31, 0.2)',
                            }}
                        >
                            {/* Strip gilt superior */}
                            <div
                                aria-hidden="true"
                                className="h-px w-full"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--color-gilt), transparent)',
                                }}
                            />

                            {/* Cabecera tipo library card */}
                            <div
                                className="px-8 md:px-12 py-6 flex items-center justify-between gap-4 border-b"
                                style={{ borderColor: 'rgba(28, 45, 31, 0.10)' }}
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        aria-hidden="true"
                                        className="block w-8 h-px"
                                        style={{ background: 'var(--color-gilt)' }}
                                    />
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/60">
                                        Ficha del libro
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/40">
                                    № 001
                                </span>
                            </div>

                            {/* Grid de specs — 2 col mobile, 3 col desktop
                  El "gap-px" con background del contenedor crea hairlines
                  perfectas sin lidiar con bordes individuales. */}
                            <div
                                className="grid grid-cols-2 md:grid-cols-3 gap-px"
                                style={{ background: 'rgba(28, 45, 31, 0.10)' }}
                            >
                                {specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="px-6 md:px-10 py-8 md:py-10 flex flex-col justify-between min-h-[120px]"
                                        style={{ background: 'var(--color-silk)' }}
                                    >
                                        <div className="font-ui text-[0.65rem] font-semibold tracking-[0.24em] uppercase text-olive-dark/50 mb-4">
                                            {spec.label}
                                        </div>
                                        <div className="font-display font-normal italic text-olive-dark text-[1.35rem] leading-[1.15]">
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer con firma */}
                            <div
                                className="px-8 md:px-12 py-6 flex items-center justify-between gap-4 border-t"
                                style={{ borderColor: 'rgba(28, 45, 31, 0.10)' }}
                            >
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/45">
                                    {BOOK.title} — {BOOK.subtitle}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="block w-8 h-px"
                                    style={{ background: 'var(--color-gilt)' }}
                                />
                            </div>

                            {/* Strip gilt inferior */}
                            <div
                                aria-hidden="true"
                                className="h-px w-full"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--color-gilt), transparent)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ BLUEPRINT · SER · HACER · TENER ═══════════════════ */}
            <section
                id="method"
                ref={pillarsRef}
                className="py-32 md:py-48 border-t"
                style={{ borderColor: 'rgba(28, 45, 31, 0.08)', background: 'var(--color-silk)' }}
            >
                <div className="max-w-[1400px] mx-auto px-[6%]">
                    <header className="max-w-2xl mb-24 md:mb-32">
                        <div className="font-mono text-[11px] tracking-[0.3em] uppercase
              text-olive-dark/55 mb-8 flex items-center gap-4">
                            <span
                                aria-hidden="true"
                                className="block w-10 h-px"
                                style={{ background: 'var(--color-gilt)' }}
                            />
                            El blueprint · Tres movimientos
                        </div>
                        <h2 className="font-display font-light text-olive-dark
              text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-tight m-0">
                            Un mapa en{' '}
                            <em className="italic font-normal text-olive">tres coordenadas</em>.
                        </h2>
                        <p className="mt-8 max-w-[52ch] text-lg text-olive-dark/75 leading-[1.7]">
                            No es una fórmula ni un método rígido. Es un mapa — de adentro
                            hacia afuera — que reorienta tu relación con el dinero
                            y la vida que sostiene.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-20">
                        {BOOK.pillars.map((p, i) => (
                            <article
                                key={p.label}
                                className={`group relative pt-8 border-t border-olive-dark/25
                  transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${i * 180}ms` }}
                            >
                                <div className="flex items-start justify-between mb-10 font-mono
                  text-[10px] tracking-[0.28em] uppercase text-olive-dark/50">
                                    <span>{p.coord}</span>
                                    <span aria-hidden="true">{p.numeral}</span>
                                </div>

                                <div className="font-display font-light text-olive-dark
                  text-[clamp(2.75rem,4.5vw,4rem)] leading-[0.95] mb-4">
                                    {p.label}
                                </div>

                                <div
                                    className="font-ui text-[0.72rem] uppercase tracking-[0.2em] mb-8"
                                    style={{ color: 'var(--color-gilt)' }}
                                >
                                    {p.subtitle}
                                </div>

                                <p className="text-[1.05rem] leading-[1.75] text-olive-dark/80 max-w-[38ch]">
                                    {p.body}
                                </p>

                                <div
                                    aria-hidden="true"
                                    className="absolute -bottom-6 left-0 h-px bg-olive-dark/40
                    w-0 group-hover:w-12 transition-all duration-500 ease-out"
                                />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CITA DE LA TESIS ═══════════════════════════════════ */}
            <section
                className="py-32 md:py-40 border-t"
                style={{ borderColor: 'rgba(28, 45, 31, 0.08)', background: 'var(--color-sand)' }}
            >
                <div className="max-w-3xl mx-auto px-[6%] text-center">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/45 mb-8">
                        · Del meridiano
                    </div>
                    <blockquote className="font-display font-light italic text-olive-dark
            text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.35] m-0">
                        "{BOOK.thesis}"
                    </blockquote>
                    <div className="mt-10 font-ui text-xs tracking-[0.2em] uppercase text-olive-dark/60">
                        — {BOOK.author}
                    </div>
                </div>
            </section>

            {/* ═══ ELOGIOS TEMPRANOS · PRAISE ═══════════════════════
                 Solo se muestra con elogios reales Y el libro publicado.
                 Ver la nota en PRAISE_PENDING arriba. */}
            {showPraise && (
            <section
                ref={praiseRef}
                className="py-32 md:py-40 border-t"
                style={{ borderColor: 'rgba(28, 45, 31, 0.08)', background: 'var(--color-silk)' }}
            >
                <div className="max-w-[1400px] mx-auto px-[6%]">
                    <header className="max-w-2xl mb-20 md:mb-24">
                        <div className="font-mono text-[11px] tracking-[0.3em] uppercase
              text-olive-dark/55 mb-8 flex items-center gap-4">
                            <span
                                aria-hidden="true"
                                className="block w-10 h-px"
                                style={{ background: 'var(--color-gilt)' }}
                            />
                            Elogios tempranos
                        </div>
                        <h2 className="font-display font-light text-olive-dark
              text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] tracking-tight m-0">
                            Voces del{' '}
                            <em className="italic font-normal text-olive">meridiano</em>.
                        </h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-16">
                        {bookPraise.map((p, i) => (
                            <figure
                                key={p.by}
                                className={`relative transition-all duration-700 ease-out
                  ${praiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                {/* Comilla gilt oversized */}
                                <div
                                    aria-hidden="true"
                                    className="font-display italic font-normal leading-none
                    -mt-2 mb-4 select-none"
                                    style={{
                                        color: 'var(--color-gilt)',
                                        fontSize: '4.5rem',
                                    }}
                                >
                                    "
                                </div>

                                <blockquote className="font-display italic font-light text-olive-dark
                  text-[1.2rem] md:text-[1.3rem] leading-[1.5] m-0 max-w-[34ch]">
                                    {p.text}
                                </blockquote>

                                <figcaption className="mt-8 pt-6 border-t border-olive-dark/15">
                                    <div className="font-ui text-[0.72rem] font-semibold text-olive-dark tracking-[0.2em] uppercase">
                                        — {p.by}
                                    </div>
                                    <div className="mt-2 font-ui text-[0.68rem] text-olive-dark/55 tracking-[0.18em] uppercase">
                                        {p.role}
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* ═══ CTA FINAL — Match perfecto con el Footer ══════════
                 · Fondo: var(--color-olive-dark) — MISMO tono que Footer
                 · Sin border-bottom → cero seam al pasar al Footer
                 · Un glow gilt tenue, contenido, que se desvanece
                   antes de tocar el borde inferior para no filtrarse
                 ═══════════════════════════════════════════════════════ */}
            <section
                id="buy"
                ref={ctaRef}
                className="py-32 md:py-40 relative overflow-hidden"
                style={{ background: 'var(--color-olive-dark)' }}
            >
                {/* Glow gilt centrado — con caída generosa para no bleed al footer */}
                <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[520px] h-[520px] pointer-events-none opacity-[0.14] blur-3xl"
                    style={{
                        background:
                            'radial-gradient(circle, var(--color-gilt), transparent 65%)',
                    }}
                />

                <div className="relative max-w-4xl mx-auto px-[6%] text-center">
                    <div
                        className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        <div
                            className="font-mono text-[10px] tracking-[0.32em] uppercase mb-6
                flex items-center justify-center gap-4"
                            style={{ color: 'rgba(253, 251, 247, 0.6)' }}
                        >
                            <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                            Lleva el mapa contigo
                            <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                        </div>

                        <h2
                            className="font-display font-light text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] mb-8 m-0"
                            style={{ color: 'var(--color-sand)' }}
                        >
                            Comienza tu{' '}
                            <em className="italic font-normal" style={{ color: 'var(--color-gilt)' }}>
                                viaje
                            </em>
                            .
                        </h2>

                        <p
                            className="max-w-[42ch] mx-auto text-lg leading-[1.7] mb-14"
                            style={{ color: 'rgba(253, 251, 247, 0.75)' }}
                        >
                            <span className="font-display italic" style={{ color: 'var(--color-sand)' }}>
                                {BOOK.title}
                            </span>
                            {' — '}
                            <span style={{ color: 'rgba(253, 251, 247, 0.85)' }}>{BOOK.subtitle}</span>.
                            <br className="hidden sm:block" />
                            {BOOK.onSale ? 'Disponible ahora en Amazon.' : 'Próximamente disponible.'}
                        </p>

                        <BuyButton onDark />
                    </div>
                </div>
            </section>
        </article>
    );
}
