import useIntersectionObserver from '../hooks/useIntersectionObserver';

/**
 * Metodologia — "El Camino de la Transformación"
 *
 * Timeline editorial vertical alternada, conectada por una línea
 * gilt tenue con glow. Cada paso vive en una tarjeta glassmórfica
 * con:
 *   · Numeral serif grande (01, 02, 03) en tono gilt suave
 *   · Coordenada mono
 *   · Título Fraunces + subtítulo Inter Tight uppercase
 *   · Descripción Newsreader
 *
 * Layout:
 *   Desktop → línea central + tarjetas alternadas izq/der
 *   Mobile  → línea izquierda + tarjetas apiladas
 */

const steps = [
    {
        number: '01',
        coord: '18°28′N',
        label: 'Ser',
        subtitle: 'Raíces & mentalidad',
        body:
            'Tu relación con el dinero comenzó mucho antes de tu primer sueldo. Revisitamos las historias que heredaste, las creencias que ya no te sirven, y ordenamos la conversación interna.',
    },
    {
        number: '02',
        coord: '70°42′W',
        label: 'Hacer',
        subtitle: 'Disciplina & estrategia',
        body:
            'Cuando la mentalidad se ordena, la estrategia se vuelve simple. Presupuestos que respiran, decisiones que se sostienen, hábitos que te devuelven horas y libertad.',
    },
    {
        number: '03',
        coord: '∞',
        label: 'Tener',
        subtitle: 'Abundancia manifiesta',
        body:
            'Lo que se cultiva en el ser y se ordena en el hacer, se manifiesta con naturalidad en el tener. Patrimonio, tranquilidad, y la evidencia visible de una vida bien orientada.',
    },
];

export default function Metodologia() {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section
            id="pilares"
            ref={sectionRef}
            className="relative py-32 md:py-44 overflow-hidden"
            style={{ background: 'var(--color-silk)' }}
        >
            {/* Textura sutil de brillos */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    background:
                        'radial-gradient(circle at 20% 20%, rgba(201,162,39,0.05), transparent 40%), radial-gradient(circle at 80% 80%, rgba(46,59,50,0.04), transparent 40%)',
                }}
            />

            <div className="relative max-w-[1400px] mx-auto px-[6%]">

                {/* ─── Header editorial ─────────────────────────── */}
                <header
                    className={`max-w-3xl mx-auto text-center mb-24 md:mb-32 transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-olive-dark/55 mb-8 flex items-center justify-center gap-4">
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                        Metodología · III movimientos
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                    </div>

                    <h2 className="font-display font-light text-olive-dark text-[clamp(2.15rem,4.8vw,3.75rem)] leading-[1.02] tracking-tight m-0">
                        El camino de la{' '}
                        <em className="italic font-normal text-olive">transformación</em>.
                    </h2>

                    <p className="mt-8 text-lg text-olive-dark/75 leading-[1.75] max-w-[54ch] mx-auto">
                        Un mapa — de adentro hacia afuera — que reorienta tu relación
                        con el dinero y la vida que sostiene. Tres pasos, un solo eje:
                        el tuyo.
                    </p>
                </header>

                {/* ─── Timeline vertical ──────────────────────────── */}
                <div className="relative max-w-5xl mx-auto pb-4">

                    {/* Línea gilt vertical — desktop centro, mobile izquierda */}
                    <div
                        aria-hidden="true"
                        className="absolute top-6 bottom-6 w-px left-[22px] md:left-1/2 md:-translate-x-1/2"
                        style={{
                            background:
                                'linear-gradient(180deg, transparent 0%, var(--color-gilt) 15%, var(--color-gilt) 85%, transparent 100%)',
                            opacity: 0.55,
                        }}
                    />
                    {/* Glow blur detrás de la línea */}
                    <div
                        aria-hidden="true"
                        className="absolute top-6 bottom-6 w-6 left-[10px] md:left-1/2 md:-translate-x-1/2 blur-2xl animate-soft-glow"
                        style={{
                            background:
                                'linear-gradient(180deg, transparent 0%, var(--color-gilt) 50%, transparent 100%)',
                            opacity: 0.28,
                        }}
                    />

                    {/* Pasos */}
                    {steps.map((step, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <div
                                key={step.label}
                                className={`relative mb-16 md:mb-24 last:mb-0 grid grid-cols-1 md:grid-cols-2 items-start
                  transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${150 + i * 180}ms` }}
                            >
                                {/* Nodo en la línea */}
                                <div
                                    aria-hidden="true"
                                    className="absolute top-8 w-3.5 h-3.5 rounded-full border left-[15px] md:left-1/2 md:-translate-x-1/2"
                                    style={{
                                        background: 'var(--color-silk)',
                                        borderColor: 'var(--color-gilt)',
                                        boxShadow: '0 0 0 6px rgba(245, 242, 235, 1), 0 0 22px rgba(201, 162, 39, 0.25)',
                                    }}
                                />

                                {/* Tarjeta */}
                                <div
                                    className={`
                    pl-14 md:pl-0
                    ${isLeft
                                            ? 'md:col-start-1 md:pr-14'
                                            : 'md:col-start-2 md:pl-14'
                                        }
                  `}
                                >
                                    <article
                                        className="card-glass relative p-8 md:p-10 rounded-lg
                      transition-all duration-700 ease-out
                      hover:-translate-y-1
                      hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]"
                                    >
                                        {/* Header de tarjeta: coord + numeral serif */}
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 pt-2">
                                                {step.coord}
                                            </div>
                                            <div
                                                className="font-display italic font-light leading-[0.8] select-none"
                                                style={{
                                                    color: 'var(--color-gilt)',
                                                    fontSize: 'clamp(3.5rem, 5vw, 4.5rem)',
                                                    opacity: 0.72,
                                                }}
                                                aria-hidden="true"
                                            >
                                                {step.number}
                                            </div>
                                        </div>

                                        {/* Título */}
                                        <h3 className="font-display font-light text-olive-dark text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.05] mb-3 m-0">
                                            {step.label}
                                        </h3>

                                        {/* Subtítulo */}
                                        <div
                                            className="font-ui text-[0.72rem] uppercase tracking-[0.22em] mb-6"
                                            style={{ color: 'var(--color-gilt)' }}
                                        >
                                            {step.subtitle}
                                        </div>

                                        {/* Body */}
                                        <p className="text-[1.02rem] leading-[1.75] text-olive-dark/80 m-0">
                                            {step.body}
                                        </p>

                                        {/* Hairline gilt inferior — animado on hover */}
                                        <div
                                            aria-hidden="true"
                                            className="mt-8 h-px w-10 transition-all duration-700 ease-out group-hover:w-24"
                                            style={{ background: 'var(--color-gilt)', opacity: 0.55 }}
                                        />
                                    </article>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
