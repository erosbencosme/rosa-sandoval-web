import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { BOOK } from '../constants';

/**
 * Method — Ser · Hacer · Tener.
 * Reemplaza al viejo Pilares.jsx.
 * Sin iconos gradiente. Sin tarjetas redondeadas.
 * Tres plazas editoriales bajo una regla horizontal fina —
 * cada una etiquetada con su coordenada, su numeral romano,
 * y una tipografía display ligera.
 *
 * Los `data-pillar-anchor` son consumidos por <MeridianRail />
 * si algún día quieres snap magnético a cada pilar.
 */
export default function Method() {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

    return (
        <section
            id="method"
            ref={ref}
            className="relative bg-cream py-32 md:py-48"
        >
            <div className="max-w-[1400px] mx-auto px-[6%]">

                {/* Encabezado editorial */}
                <header className="max-w-2xl mb-24 md:mb-32">
                    <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive/60 mb-8 flex items-center gap-4">
                        <span aria-hidden="true" className="block w-10 h-px bg-olive/40" />
                        La metodología · III movimientos
                    </div>

                    <h2 className="font-display font-light text-olive-dark text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight">
                        Un mapa en{' '}
                        <em className="not-italic italic font-normal text-olive">
                            tres coordenadas
                        </em>
                        .
                    </h2>

                    <p className="mt-8 max-w-[52ch] font-body text-lg text-olive-dark/75 leading-[1.7]">
                        No es una fórmula ni un método rígido. Es un mapa —
                        de adentro hacia afuera— que reorienta tu relación con el dinero
                        y la vida que sostiene.
                    </p>
                </header>

                {/* Tres plazas — grid asimétrico controlado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-20">
                    {BOOK.pillars.map((pillar, i) => (
                        <article
                            key={pillar.label}
                            data-pillar-anchor={pillar.label.toLowerCase()}
                            className={`group relative pt-8 border-t border-olive-dark/25
                transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            style={{ transitionDelay: `${i * 180}ms` }}
                        >
                            {/* Ficha superior: coordenada · numeral */}
                            <div className="flex items-start justify-between mb-10 font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/50">
                                <span>{pillar.coord}</span>
                                <span aria-hidden="true">{pillar.numeral}</span>
                            </div>

                            {/* Nombre del pilar — display ligero, gigante */}
                            <div className="font-display font-light text-olive-dark text-[clamp(2.75rem,4.5vw,4rem)] leading-[0.95] mb-4">
                                {pillar.label}
                            </div>

                            {/* Subtítulo — UI sans, small caps */}
                            <div className="font-ui text-[0.72rem] uppercase tracking-[0.2em] text-olive mb-8">
                                {pillar.subtitle}
                            </div>

                            {/* Cuerpo — serif editorial */}
                            <p className="font-body text-[1.05rem] leading-[1.75] text-olive-dark/80 max-w-[38ch]">
                                {pillar.body}
                            </p>

                            {/* Regla inferior — aparece en hover, silenciosa */}
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-6 left-0 h-px bg-olive-dark/40
                  w-0 group-hover:w-12 transition-all duration-500 ease-out"
                            />
                        </article>
                    ))}
                </div>

                {/* Cierre — pie mono, ancla al eje del libro */}
                <div className="mt-32 md:mt-40 max-w-2xl">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive/50 mb-4">
                        · Fin del meridiano
                    </div>
                    <p className="font-display font-light italic text-olive-dark text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.3]">
                        “{BOOK.thesis}”
                    </p>
                </div>
            </div>
        </section>
    );
}
