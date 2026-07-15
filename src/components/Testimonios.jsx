import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Testimonios — Carrusel editorial en superficie clara.
 *
 * Fondo:  sand  (#FDFBF7) — mismo tono cálido del sitio, sin dark stage
 * Card:   silk  (#F5F2EB) — beige seda con borde hilo
 * Acento: gilt  (#C9A227) — sólo en comillas, hairlines y dot activo
 *
 * Fuera: fondos verde oscuro, radial "beige glow" (que leía anaranjado)
 *        y cualquier bloque de color agresivo. Todo se sostiene en
 *        tipografía, whitespace y detalles gilt.
 */

const testimonials = [
    {
        text:
            'Mi cuenta bancaria duplicó en 3 meses. Las sesiones fueron precisas y efectivas. Rosa me ayudó a cambiar mi mentalidad completamente.',
        author: 'María Rodríguez',
        role: 'Emprendedora',
        result: 'Ingresos duplicados en 90 días',
    },
    {
        text:
            'La estructura grupal proporcionó accountability perfecta. Resultados inmediatos. Ahora tengo control total de mis finanzas.',
        author: 'Lucía Castro',
        role: 'Directora',
        result: 'Control financiero total',
    },
    {
        text:
            'Contenido estructurado y accesible. Mi mejor inversión profesional. En 6 meses logré eliminar todas mis deudas.',
        author: 'Ana Castillo',
        role: 'Consultora',
        result: 'Cero deudas en 6 meses',
    },
];

const AUTO_ADVANCE_MS = 7000;

export default function Testimonios() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = testimonials.length;
    const sliderRef = useRef(null);

    const goTo = (i) => setIndex(((i % total) + total) % total);
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    // Auto-avance
    useEffect(() => {
        if (paused) return;
        const t = setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
        return () => clearTimeout(t);
    }, [index, paused]); // eslint-disable-line react-hooks/exhaustive-deps

    // Navegación por teclado dentro del slider
    useEffect(() => {
        const node = sliderRef.current;
        if (!node) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        };
        node.addEventListener('keydown', onKey);
        return () => node.removeEventListener('keydown', onKey);
    }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section
            id="testimonios"
            className="relative py-32 md:py-44 overflow-hidden"
            style={{ background: 'var(--color-sand)' }}
        >
            <div className="relative max-w-[1200px] mx-auto px-[6%]">

                {/* Header editorial */}
                <header className="text-center mb-20 md:mb-24">
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-olive-dark/55 mb-8 flex items-center justify-center gap-4">
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                        Historias reales
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                    </div>

                    <h2 className="font-display font-light text-olive-dark text-[clamp(2rem,4.8vw,3.75rem)] leading-[1.02] tracking-tight m-0">
                        Del papel a la{' '}
                        <em className="italic font-normal text-olive">vida real</em>.
                    </h2>
                </header>

                {/* ── Slider ── */}
                <div
                    ref={sliderRef}
                    tabIndex={0}
                    role="region"
                    aria-roledescription="carrusel"
                    aria-label="Testimonios de clientas"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    className="relative max-w-4xl mx-auto min-h-[520px] md:min-h-[480px]
            outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gilt)]
            focus-visible:ring-offset-8 focus-visible:ring-offset-[color:var(--color-sand)]
            rounded-lg"
                >
                    {testimonials.map((t, i) => (
                        <article
                            key={t.author}
                            aria-hidden={i !== index}
                            className={`absolute inset-0 flex items-center justify-center
                transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${i === index
                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 translate-y-4 pointer-events-none'}`}
                        >
                            {/* Tarjeta silk — el "open magazine" */}
                            <div
                                className="relative w-full rounded-lg px-8 md:px-16 lg:px-20 py-14 md:py-20 text-center overflow-hidden"
                                style={{
                                    background: 'var(--color-silk)',
                                    border: '1px solid rgba(28, 45, 31, 0.08)',
                                    boxShadow: '0 30px 80px -45px rgba(28, 45, 31, 0.22)',
                                }}
                            >
                                {/* Marcos hairline gilt en las 4 esquinas — sello editorial */}
                                <span aria-hidden="true" className="absolute top-0 left-0 w-14 h-px" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute top-0 left-0 w-px h-14" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute top-0 right-0 w-14 h-px" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute top-0 right-0 w-px h-14" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute bottom-0 left-0 w-14 h-px" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute bottom-0 left-0 w-px h-14" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute bottom-0 right-0 w-14 h-px" style={{ background: 'var(--color-gilt)' }} />
                                <span aria-hidden="true" className="absolute bottom-0 right-0 w-px h-14" style={{ background: 'var(--color-gilt)' }} />

                                {/* Comilla gilt oversize */}
                                <div
                                    aria-hidden="true"
                                    className="font-display italic font-normal leading-[0.5] mb-6 select-none"
                                    style={{
                                        color: 'var(--color-gilt)',
                                        fontSize: 'clamp(6rem, 12vw, 9.5rem)',
                                    }}
                                >
                                    “
                                </div>

                                <blockquote className="font-display italic font-light text-olive-dark m-0 max-w-[44ch] mx-auto
                  text-[clamp(1.4rem,2.8vw,2.35rem)] leading-[1.35] tracking-tight">
                                    {t.text}
                                </blockquote>

                                <footer className="mt-10 md:mt-12">
                                    <div
                                        className="w-12 h-px mx-auto mb-5"
                                        aria-hidden="true"
                                        style={{ background: 'var(--color-gilt)' }}
                                    />
                                    <div className="font-ui text-xs font-semibold text-olive-dark tracking-[0.22em] uppercase">
                                        {t.author}
                                    </div>
                                    <div className="mt-2 font-ui text-[0.7rem] text-olive-dark/55 tracking-[0.2em] uppercase">
                                        {t.role}
                                        {' · '}
                                        <span style={{ color: 'var(--color-gilt)' }}>{t.result}</span>
                                    </div>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>

                {/* ── Controles ── */}
                <div className="mt-14 flex items-center justify-between gap-6 max-w-[560px] mx-auto">

                    {/* Prev */}
                    <button
                        onClick={prev}
                        aria-label="Testimonio anterior"
                        className="group w-11 h-11 rounded-full flex items-center justify-center
              border cursor-pointer bg-transparent
              transition-all duration-500 ease-out
              hover:bg-[color-mix(in_srgb,var(--color-beige)_22%,white)]"
                        style={{ borderColor: 'rgba(46, 59, 50, 0.22)' }}
                    >
                        <ChevronLeft
                            size={17}
                            aria-hidden="true"
                            className="text-olive-dark/65 group-hover:text-olive-dark transition-colors duration-300 group-hover:-translate-x-0.5"
                        />
                    </button>

                    {/* Dots + contador */}
                    <div className="flex items-center gap-6">
                        <div
                            className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55"
                            aria-hidden="true"
                        >
                            {String(index + 1).padStart(2, '0')}
                            <span style={{ color: 'var(--color-gilt)' }}> / </span>
                            {String(total).padStart(2, '0')}
                        </div>
                        <div className="flex items-center gap-2.5" role="tablist" aria-label="Seleccionar testimonio">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    role="tab"
                                    aria-selected={i === index}
                                    aria-label={`Testimonio ${i + 1} de ${total}`}
                                    className="group py-2 cursor-pointer bg-transparent border-0"
                                >
                                    <span
                                        className={`block h-[3px] rounded-full transition-all duration-[600ms] ease-out
                      ${i === index ? 'w-11' : 'w-4 group-hover:w-6'}`}
                                        style={{
                                            background:
                                                i === index
                                                    ? 'var(--color-gilt)'
                                                    : 'rgba(46, 59, 50, 0.28)',
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        onClick={next}
                        aria-label="Testimonio siguiente"
                        className="group w-11 h-11 rounded-full flex items-center justify-center
              border cursor-pointer bg-transparent
              transition-all duration-500 ease-out
              hover:bg-[color-mix(in_srgb,var(--color-beige)_22%,white)]"
                        style={{ borderColor: 'rgba(46, 59, 50, 0.22)' }}
                    >
                        <ChevronRight
                            size={17}
                            aria-hidden="true"
                            className="text-olive-dark/65 group-hover:text-olive-dark transition-colors duration-300 group-hover:translate-x-0.5"
                        />
                    </button>
                </div>

                {/* Firma editorial de cierre */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/45">
                        <span aria-hidden="true" className="w-6 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />
                        50+ mujeres transformadas
                        <span aria-hidden="true" className="w-6 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
