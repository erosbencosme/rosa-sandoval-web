import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { GPS_PILLARS } from '../constants';

// ================================================================
// GpsTimeline.jsx — Los tres movimientos del GPS de la Abundancia®
// ================================================================
//
// Timeline vertical alternada, conectada por una línea gilt con glow.
// Cada movimiento vive en una tarjeta glassmórfica con numeral serif,
// coordenada mono, título display y descripción.
//
// Layout:
//   Desktop → línea central + tarjetas alternadas izquierda/derecha
//   Mobile  → línea a la izquierda + tarjetas apiladas
//
// Los datos vienen de GPS_PILLARS (constants.js) — antes estaban
// duplicados en tres archivos distintos.
//
// Props:
//   variant: 'full'  → texto largo (página GPS de la Abundancia®)
//            'short' → texto breve (home, libro)
// ================================================================

export default function GpsTimeline({ variant = 'full' }) {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="relative max-w-5xl mx-auto pb-4">

      {/* Línea gilt vertical — desktop al centro, mobile a la izquierda */}
      <div
        aria-hidden="true"
        className="absolute top-6 bottom-6 w-px left-[22px] md:left-1/2 md:-translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--color-gilt) 15%, var(--color-gilt) 85%, transparent 100%)',
          opacity: 0.55,
        }}
      />

      {/* Glow difuso detrás de la línea */}
      <div
        aria-hidden="true"
        className="absolute top-6 bottom-6 w-6 left-[10px] md:left-1/2 md:-translate-x-1/2 blur-2xl animate-soft-glow"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, var(--color-gilt) 50%, transparent 100%)',
          opacity: 0.28,
        }}
      />

      {GPS_PILLARS.map((step, i) => {
        const isLeft = i % 2 === 0;

        return (
          <div
            key={step.label}
            className={`relative mb-16 md:mb-24 last:mb-0 grid grid-cols-1 md:grid-cols-2 items-start
              transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${150 + i * 180}ms` }}
          >
            {/* Nodo sobre la línea */}
            <div
              aria-hidden="true"
              className="absolute top-8 w-3.5 h-3.5 rounded-full border left-[15px] md:left-1/2 md:-translate-x-1/2"
              style={{
                background: 'var(--color-silk)',
                borderColor: 'var(--color-gilt)',
                boxShadow: '0 0 0 6px var(--color-silk), 0 0 22px rgba(201, 162, 39, 0.25)',
              }}
            />

            <div className={`pl-14 md:pl-0 ${isLeft ? 'md:col-start-1 md:pr-14' : 'md:col-start-2 md:pl-14'}`}>
              <article
                className="group card-glass relative p-8 md:p-10 rounded-lg
                  transition-all duration-700 ease-out
                  hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]"
              >
                {/* Coordenada + numeral */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 pt-2">
                    {step.coord}
                  </div>
                  <div
                    aria-hidden="true"
                    className="font-display italic font-light leading-[0.8] select-none"
                    style={{
                      color: 'var(--color-gilt)',
                      fontSize: 'clamp(3.5rem, 5vw, 4.5rem)',
                      opacity: 0.72,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="font-display font-light text-olive-dark text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.05] mb-3 m-0">
                  {step.label}
                </h3>

                <div
                  className="font-ui text-[0.72rem] uppercase tracking-[0.22em] mb-6"
                  style={{ color: 'var(--color-gilt)' }}
                >
                  {step.subtitle}
                </div>

                <p className="text-[1.02rem] leading-[1.75] text-olive-dark/80 m-0">
                  {variant === 'short' ? step.short : step.body}
                </p>

                {/* Hairline inferior que crece en hover */}
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
  );
}
