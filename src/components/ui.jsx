// ================================================================
// ui.jsx — PRIMITIVAS COMPARTIDAS DEL SISTEMA EDITORIAL
// ================================================================
//
// Todas las páginas se construyen con estas piezas. Si algo se ve
// distinto entre dos páginas, casi siempre es porque una de las dos
// no está usando la primitiva correspondiente.
//
// Lenguaje visual (definido en index.css):
//   · Fondos:   sand (base) · silk (superficie premium) · rich (dark stage)
//   · Acento:   gilt — hairlines, numerales, dots. Nunca bloques grandes.
//   · Tipos:    Fraunces (display) · Newsreader (cuerpo) · Inter Tight (UI)
//               · JetBrains Mono (eyebrows técnicos)
// ================================================================

import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Link from './Link';

/* ================================================================
   Reveal — animación de entrada al hacer scroll
   ================================================================
   Envuelve cualquier bloque. Respeta prefers-reduced-motion vía el
   media query global de index.css.
*/
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.12 });

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ================================================================
   Eyebrow — etiqueta mono con hairline gilt
   ================================================================ */
export function Eyebrow({ children, align = 'left', onDark = false }) {
  const alignment =
    align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : '';

  return (
    <div
      className={`font-mono text-[11px] tracking-[0.3em] uppercase mb-8 flex items-center gap-4
        ${onDark ? 'text-sand/60' : 'text-olive-dark/55'} ${alignment}`}
    >
      <span aria-hidden="true" className="block w-10 h-px shrink-0" style={{ background: 'var(--color-gilt)' }} />
      <span>{children}</span>
      {align === 'center' && (
        <span aria-hidden="true" className="block w-10 h-px shrink-0" style={{ background: 'var(--color-gilt)' }} />
      )}
    </div>
  );
}

/* ================================================================
   SectionTitle — H2 display con énfasis en itálica
   ================================================================
   Uso: <SectionTitle>El camino de la <em>transformación</em>.</SectionTitle>
   El <em> se estiliza solo gracias a la clase del contenedor.
*/
export function SectionTitle({ children, onDark = false, className = '' }) {
  return (
    <h2
      className={`font-display font-light leading-[1.05] tracking-tight m-0
        text-[clamp(2rem,4.5vw,3.25rem)]
        ${onDark ? 'text-sand' : 'text-olive-dark'}
        [&_em]:italic [&_em]:font-normal ${onDark ? '[&_em]:text-beige' : '[&_em]:text-olive'}
        ${className}`}
    >
      {children}
    </h2>
  );
}

/* ================================================================
   Lead — párrafo introductorio
   ================================================================ */
export function Lead({ children, onDark = false, className = '' }) {
  return (
    <p
      className={`text-lg leading-[1.75] max-w-[60ch]
        ${onDark ? 'text-sand/75' : 'text-olive-dark/75'} ${className}`}
    >
      {children}
    </p>
  );
}

/* ================================================================
   Prose — bloque de texto largo (Sobre Rosa, legales)
   ================================================================ */
export function Prose({ children, className = '' }) {
  return (
    <div
      className={`max-w-[68ch] text-[1.05rem] leading-[1.85] text-olive-dark/80
        [&>p]:mb-6 [&>p:last-child]:mb-0
        [&_strong]:text-olive-dark [&_strong]:font-semibold
        [&_h3]:font-display [&_h3]:font-normal [&_h3]:text-olive-dark
        [&_h3]:text-[1.5rem] [&_h3]:mt-12 [&_h3]:mb-4
        [&_ul]:mb-6 [&_ul]:pl-0 [&_ul]:list-none
        [&_li]:relative [&_li]:pl-6 [&_li]:mb-3
        ${className}`}
    >
      {children}
    </div>
  );
}

/* ================================================================
   BulletList — lista con dot gilt
   ================================================================ */
export function BulletList({ items, onDark = false, className = '' }) {
  return (
    <ul className={`list-none m-0 p-0 space-y-4 ${className}`}>
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.title} className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-[0.7em] w-[5px] h-[5px] rounded-full shrink-0"
            style={{ background: 'var(--color-gilt)' }}
          />
          {typeof item === 'string' ? (
            <span className={`leading-[1.7] ${onDark ? 'text-sand/80' : 'text-olive-dark/80'}`}>
              {item}
            </span>
          ) : (
            <span>
              <span className={`font-ui font-semibold text-[0.95rem] block mb-1 ${onDark ? 'text-sand' : 'text-olive-dark'}`}>
                {item.title}
              </span>
              <span className={`leading-[1.7] text-[0.98rem] ${onDark ? 'text-sand/70' : 'text-olive-dark/70'}`}>
                {item.body}
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ================================================================
   Botones
   ================================================================
   CtaLink   → enlace EXTERNO (Google Form, Amazon, WhatsApp)
   CtaRoute  → navegación INTERNA (usa el router por hash)
   Ambos comparten .btn-luxury para que no haya dos botones distintos.
*/

/** Contenido interno compartido: label + dot que se desliza en hover */
function CtaContent({ children }) {
  return (
    <>
      <span>{children}</span>
      <span className="btn-luxury-dot" aria-hidden="true" />
    </>
  );
}

export function CtaLink({ href, children, onDark = false, className = '', ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-luxury ${onDark ? 'btn-luxury--onDark' : ''} ${className}`}
      {...rest}
    >
      <CtaContent>{children}</CtaContent>
    </a>
  );
}

export function CtaRoute({ to, children, onDark = false, className = '', ...rest }) {
  return (
    <Link
      to={to}
      className={`btn-luxury ${onDark ? 'btn-luxury--onDark' : ''} ${className}`}
      {...rest}
    >
      <CtaContent>{children}</CtaContent>
    </Link>
  );
}

/**
 * CtaSolid — CTA de máxima jerarquía (verde sólido).
 * Se reserva para la acción principal de cada página; el resto usa
 * .btn-luxury para no competir.
 */
export function CtaSolid({ href, to, children, external = false, className = '', ...rest }) {
  const classes = `inline-flex items-center justify-center gap-3
    bg-olive-dark text-cream px-8 py-4 rounded-md
    font-ui font-medium text-[0.78rem] tracking-[0.16em] uppercase no-underline
    shadow-[0_10px_30px_-12px_rgba(46,59,50,0.5)]
    transition-all duration-500 ease-out
    hover:bg-olive hover:-translate-y-0.5
    hover:shadow-[0_18px_40px_-12px_rgba(46,59,50,0.55)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2
    ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/* ================================================================
   PageHero — cabecera estándar de página interior
   ================================================================
   Da a todas las páginas el mismo ritmo de entrada: eyebrow, título
   display, lead y (opcional) CTA.
*/
export function PageHero({ eyebrow, title, lead, children, background = 'sand' }) {
  const bg = background === 'silk' ? 'var(--color-silk)' : 'var(--color-sand)';

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden" style={{ background: bg }}>
      {/* Hairline marginal — firma editorial presente en todo el sitio */}
      <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

      <div className="relative max-w-[1400px] mx-auto px-[6%]">
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display font-light text-olive-dark leading-[1.03] tracking-tight m-0
            text-[clamp(2.25rem,5.5vw,4rem)] max-w-[20ch]
            [&_em]:italic [&_em]:font-normal [&_em]:text-olive">
            {title}
          </h1>
          {lead && <Lead className="mt-8">{lead}</Lead>}
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   Section — contenedor de sección con fondo y padding estándar
   ================================================================ */
export function Section({ id, children, background = 'sand', className = '', width = '1400px' }) {
  const backgrounds = {
    sand: 'var(--color-sand)',
    silk: 'var(--color-silk)',
    rich: 'var(--color-rich)',
    white: '#ffffff',
  };

  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 overflow-hidden ${className}`}
      style={{ background: backgrounds[background] }}
    >
      <div className="relative mx-auto px-[6%]" style={{ maxWidth: width }}>
        {children}
      </div>
    </section>
  );
}

/* ================================================================
   Hairline — regla horizontal fina gilt
   ================================================================ */
export function Hairline({ className = '', width = 'w-10' }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px ${width} ${className}`}
      style={{ background: 'var(--color-gilt)', opacity: 0.55 }}
    />
  );
}

/* ================================================================
   Card — superficie glassmórfica con hover
   ================================================================ */
export function Card({ children, className = '' }) {
  return (
    <article
      className={`card-glass relative p-8 md:p-10 rounded-lg h-full
        transition-all duration-700 ease-out
        hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]
        ${className}`}
    >
      {children}
    </article>
  );
}

/* ================================================================
   PlaceholderNote — marca visible SOLO en desarrollo
   ================================================================
   Recuerda en pantalla qué contenido sigue siendo de relleno.
   En el build de producción no se renderiza.
*/
export function PlaceholderNote({ children }) {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="my-4 px-4 py-3 rounded border border-dashed border-amber-500/60 bg-amber-50/70
      font-mono text-[11px] leading-relaxed text-amber-900">
      ⚠️ CONTENIDO PLACEHOLDER — {children}
    </div>
  );
}
