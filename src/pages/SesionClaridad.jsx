import { ArrowLeft } from 'lucide-react';
import Link from '../components/Link';
import { GOOGLE_FORM_URL, ROSA_PORTRAIT_PATH, BRAND } from '../constants';
import ContactForm from '../components/ContactForm';
import { Reveal, Hairline, CtaLink } from '../components/ui';

// ================================================================
// SesionClaridad.jsx — LANDING DE CONVERSIÓN
// ================================================================
//
// 🎯 Nota de diseño de la clienta:
//    "Página sin menú de navegación principal — diseñada como landing
//     de conversión, ideal para tráfico pagado o enlaces directos
//     desde el blog y redes sociales. Un visitante que llega aquí
//     debe poder agendar sin distraerse con el resto del sitio."
//
// Por eso App.jsx monta esta ruta con chrome='bare': sin Navbar y
// sin Footer. La única salida es un enlace discreto al inicio, para
// no dejar al visitante encerrado (requisito de usabilidad básica).
//
// Dos caminos para agendar, a propósito:
//   1. Google Form — el flujo que Rosa ya tiene montado y usa hoy
//   2. Formulario propio — para quien prefiere no salir de la página
//
// Ambos llegan a Rosa. Tener los dos evita perder a quien abandona
// al ver que se abre una pestaña externa.
// ================================================================

/** Lo que se identifica en la conversación */
const outcomes = [
  'Qué está ocurriendo actualmente con tus finanzas.',
  'Qué te preocupa.',
  'Qué quieres lograr.',
  'Qué obstáculos percibes.',
  'Si la mentoría es realmente adecuada para ti.',
];

export default function SesionClaridad() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-sand)' }}>

      {/* ═══ CABECERA MÍNIMA ════════════════════════════════════ */}
      {/* Sin navegación: solo el logo y una salida discreta. */}
      <header className="pt-8 pb-2">
        <div className="max-w-[1200px] mx-auto px-[6%] flex items-center justify-between gap-6">
          <img
            src="./logo.png"
            alt={BRAND.name}
            className="h-9 w-auto"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-ui text-[0.72rem] uppercase
              tracking-[0.15em] text-olive-dark/50 no-underline
              transition-colors duration-500 hover:text-olive-dark"
          >
            <ArrowLeft size={13} aria-hidden="true"
              className="transition-transform duration-500 group-hover:-translate-x-1" />
            Ir al sitio
          </Link>
        </div>
      </header>

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-[-10%] right-[-8%] w-[560px] h-[560px] rounded-full blur-[130px] opacity-[0.15] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1200px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-14 items-center">

            <Reveal className="lg:col-span-7">
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive-dark/55 mb-8
                flex items-center gap-4">
                <span aria-hidden="true" className="block w-10 h-px shrink-0" style={{ background: 'var(--color-gilt)' }} />
                Sesión de claridad · Sin costo
              </div>

              <h1 className="font-display font-light text-olive-dark leading-[1.06] tracking-tight m-0
                text-[clamp(2rem,4.6vw,3.4rem)]">
                30 minutos para conversar sobre dónde estás y qué necesitas{' '}
                <em className="italic font-normal text-olive">transformar</em>.
              </h1>

              <Hairline className="my-9" width="w-16" />

              <p className="text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[52ch]">
                No necesitas tener conocimientos financieros previos. Solo
                necesitas estar dispuesto o dispuesta a mirar tu realidad con
                honestidad y comenzar a tomar decisiones diferentes.
              </p>

              <div className="mt-10">
                <CtaLink href={GOOGLE_FORM_URL}>Quiero mi sesión de claridad</CtaLink>
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-5">
              <div className="relative w-full max-w-[380px] mx-auto">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm border"
                  style={{ borderColor: 'var(--color-gilt)', opacity: 0.4 }}
                />
                <img
                  src={ROSA_PORTRAIT_PATH}
                  alt="Rosa Sandoval Polanco"
                  loading="eager"
                  className="relative w-full aspect-[4/5] object-cover object-top rounded-sm
                    shadow-[0_40px_80px_-40px_rgba(28,45,31,0.5)]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ QUÉ IDENTIFICAMOS ══════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: 'var(--color-silk)' }}>
        <div className="max-w-[1200px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-start">

            <Reveal className="lg:col-span-5">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-7">
                En esta conversación
              </div>

              <h2 className="font-display font-light text-olive-dark leading-[1.1] tracking-tight m-0
                text-[clamp(1.85rem,3.6vw,2.6rem)]">
                Podremos <em className="italic font-normal text-olive">identificar</em>
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <ol className="list-none m-0 p-0">
                {outcomes.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-6 py-6 border-b border-olive-dark/12 last:border-0"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.7rem] tracking-[0.2em] pt-1.5 shrink-0"
                      style={{ color: 'var(--color-gilt)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.05rem] leading-[1.7] text-olive-dark/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FORMULARIO ═════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: 'var(--color-sand)' }}>
        <div className="max-w-[880px] mx-auto px-[6%]">

          <Reveal className="text-center mb-14">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-7
              flex items-center justify-center gap-4">
              <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
              Agenda tu sesión
              <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
            </div>

            <h2 className="font-display font-light text-olive-dark leading-[1.1] tracking-tight m-0
              text-[clamp(1.85rem,3.6vw,2.6rem)]">
              Cuéntame dónde <em className="italic font-normal text-olive">estás</em>
            </h2>

            <p className="mt-7 text-[1.02rem] leading-[1.75] text-olive-dark/70 max-w-[48ch] mx-auto">
              Déjame tus datos y coordinamos la llamada. Sin costo y sin
              compromiso de compra.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm variant="individual" />
          </Reveal>

          {/* Alternativa: el Google Form que Rosa ya usa */}
          <Reveal delay={200} className="mt-14 pt-10 border-t border-olive-dark/12 text-center">
            <p className="text-[0.95rem] text-olive-dark/60 m-0 mb-6">
              ¿Prefieres el formulario de agenda?
            </p>
            <CtaLink href={GOOGLE_FORM_URL}>Agendar por formulario</CtaLink>
          </Reveal>
        </div>
      </section>

      {/* ═══ PIE MÍNIMO ═════════════════════════════════════════ */}
      {/* La landing no lleva el footer del sitio (rompería el foco de
          conversión), pero sí el aviso legal mínimo y una salida. */}
      <footer className="py-10 border-t border-olive-dark/10">
        <div className="max-w-[1200px] mx-auto px-[6%] flex flex-col sm:flex-row
          items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[0.8rem] text-olive-dark/45 m-0">
            © {new Date().getFullYear()} {BRAND.name}
          </p>

          <div className="flex items-center gap-5">
            <Link to="/privacidad" className="text-[0.8rem] text-olive-dark/45 no-underline
              transition-colors duration-300 hover:text-olive-dark/75">
              Política de privacidad
            </Link>
            <Link to="/" className="text-[0.8rem] text-olive-dark/45 no-underline
              transition-colors duration-300 hover:text-olive-dark/75">
              Ir al sitio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
