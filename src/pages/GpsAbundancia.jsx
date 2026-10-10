import { BRAND, GPS_PILLARS, BOOK } from '../constants';
import GpsTimeline from '../components/GpsTimeline';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline, CtaRoute,
} from '../components/ui';

// ================================================================
// GpsAbundancia.jsx — La metodología, como marca propia
// ================================================================
//
// 🎯 Nota de diseño de la clienta:
//    "Página con identidad visual propia, tratada como marca dentro
//     de la marca — no como una sección más del sitio."
//
// Cómo se traduce esa instrucción:
//   · Apertura en dark stage (rich) — el resto del sitio abre claro,
//     así que entrar aquí se siente como cruzar a otro territorio
//   · Las coordenadas (18°28′N · 70°42′W) tratadas como emblema,
//     no como decoración: son la firma gráfica del método
//   · Los tres movimientos se presentan primero como cartelas
//     tipográficas grandes y sólo después como recorrido
//   · La cita de Rosa ocupa una pantalla completa
//
// Nomenclatura: la marca es "GPS de la Abundancia®". Antes el código
// la llamaba "Método GPS", que no era el nombre registrado.
// ================================================================

export default function GpsAbundancia() {
  return (
    <>
      {/* ═══ APERTURA — DARK STAGE ══════════════════════════════ */}
      <section
        className="relative min-h-[85vh] flex items-center pt-32 pb-24 overflow-hidden"
        style={{ background: 'var(--color-rich)' }}
      >
        {/* Doble glow: define el "escenario" de la marca */}
        <div
          aria-hidden="true"
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.17]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-25%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.1]"
          style={{ background: 'radial-gradient(circle, var(--color-beige), transparent 65%)' }}
        />

        {/* Retícula de coordenadas — emblema de fondo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-gilt) 1px, transparent 1px), linear-gradient(90deg, var(--color-gilt) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6%] w-full">
          <Reveal className="max-w-[52ch]">
            {/* Coordenadas como firma de marca */}
            <div className="font-mono text-[11px] tracking-[0.34em] uppercase text-beige/70 mb-10
              flex flex-wrap items-center gap-4">
              <span aria-hidden="true" className="block w-12 h-px shrink-0" style={{ background: 'var(--color-gilt)' }} />
              <span>18°28′N</span>
              <span aria-hidden="true" className="text-sand/25">·</span>
              <span>70°42′W</span>
              <span aria-hidden="true" className="text-sand/25">·</span>
              <span>∞</span>
            </div>

            <h1 className="font-display font-light text-sand leading-[0.98] tracking-tight m-0
              text-[clamp(2.75rem,7.5vw,5.5rem)]">
              GPS de la<br />
              <em className="italic font-normal text-beige">Abundancia</em>
              <span className="align-super text-[0.35em] ml-1 text-beige/70">®</span>
            </h1>

            <Hairline className="my-10" width="w-20" />

            <p className="font-display font-light text-sand/85 leading-[1.5]
              text-[clamp(1.2rem,2.4vw,1.65rem)] max-w-[32ch]">
              Una metodología para aprender a dirigir tu vida desde el
              SER, el HACER y el TENER.
            </p>
          </Reveal>
        </div>

        {/* Franja inferior con los tres nombres */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sand/10">
          <div className="max-w-[1400px] mx-auto px-[6%]">
            <ul className="list-none m-0 p-0 grid grid-cols-3">
              {GPS_PILLARS.map((pillar, i) => (
                <li
                  key={pillar.label}
                  className={`py-6 text-center ${i < 2 ? 'border-r border-sand/10' : ''}`}
                >
                  <span className="block font-display font-light text-sand text-[clamp(1.1rem,2.4vw,1.7rem)] leading-none">
                    {pillar.label}
                  </span>
                  <span className="block mt-2 font-mono text-[9px] tracking-[0.24em] uppercase text-sand/40">
                    {pillar.coord}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ LAS TRES CARTELAS ══════════════════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mb-20">
          <Eyebrow>Los tres movimientos</Eyebrow>
          <SectionTitle>
            Un solo eje: el <em>tuyo</em>.
          </SectionTitle>
        </Reveal>

        <div className="space-y-0">
          {GPS_PILLARS.map((pillar, i) => (
            <Reveal key={pillar.label} delay={i * 130}>
              <article className="group grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6
                py-14 border-t border-olive-dark/12 last:border-b">

                {/* Numeral romano gigante */}
                <div className="md:col-span-2">
                  <span
                    aria-hidden="true"
                    className="font-display italic font-light leading-none select-none block
                      transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      color: 'var(--color-gilt)',
                      fontSize: 'clamp(3rem, 6vw, 5rem)',
                      opacity: 0.7,
                    }}
                  >
                    {pillar.numeral}
                  </span>
                </div>

                {/* Nombre */}
                <div className="md:col-span-4">
                  <h3 className="font-display font-light text-olive-dark leading-none m-0
                    text-[clamp(2.5rem,5.5vw,4rem)]">
                    {pillar.label}
                  </h3>

                  <div className="mt-4 font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/50">
                    {pillar.coord}
                  </div>
                </div>

                {/* Definición */}
                <div className="md:col-span-6">
                  <p className="font-display font-light text-olive-dark/90
                    text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.55] m-0">
                    {pillar.short}
                  </p>

                  <p className="mt-6 text-[1rem] leading-[1.8] text-olive-dark/70 m-0">
                    {pillar.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══ LA CITA ════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-44 overflow-hidden" style={{ background: 'var(--color-silk)' }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, rgba(201,162,39,0.07), transparent 45%), radial-gradient(circle at 80% 70%, rgba(46,59,50,0.05), transparent 45%)',
          }}
        />

        <div className="relative max-w-[1000px] mx-auto px-[6%] text-center">
          <Reveal>
            {/* Comilla tipográfica como ornamento */}
            <span
              aria-hidden="true"
              className="block font-display italic font-light leading-none select-none mb-4"
              style={{ color: 'var(--color-gilt)', fontSize: 'clamp(4rem, 9vw, 7rem)', opacity: 0.4 }}
            >
              &ldquo;
            </span>

            <blockquote className="m-0">
              <p className="font-display font-light italic text-olive-dark leading-[1.35] m-0
                text-[clamp(1.5rem,4vw,2.85rem)] max-w-[22ch] mx-auto">
                {BRAND.quote}
              </p>

              <footer className="mt-12">
                <Hairline className="mx-auto mb-7" width="w-12" />
                <cite className="not-italic font-ui text-[0.72rem] uppercase tracking-[0.22em] text-olive-dark/55">
                  {BRAND.name}
                </cite>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ═══ EL RECORRIDO ═══════════════════════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mx-auto text-center mb-20">
          <Eyebrow align="center">El recorrido</Eyebrow>

          <SectionTitle>
            De adentro hacia <em>afuera</em>.
          </SectionTitle>

          <p className="mt-8 text-lg leading-[1.75] text-olive-dark/75 max-w-[54ch] mx-auto">
            El orden importa. No se sostiene un patrimonio sobre decisiones que
            no se sostienen, ni decisiones sobre creencias que nunca se revisaron.
          </p>
        </Reveal>

        <GpsTimeline variant="full" />
      </Section>

      {/* ═══ CTA — LIBRO Y MENTORÍA ═════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ background: 'var(--color-rich)' }}>
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1000px] mx-auto px-[6%]">
          <Reveal className="text-center">
            <Eyebrow align="center" onDark>Vivir la metodología</Eyebrow>

            <SectionTitle onDark className="!text-[clamp(2rem,4.5vw,3.25rem)]">
              Dos maneras de <em>empezar</em>.
            </SectionTitle>

            <p className="mt-8 text-lg leading-[1.75] text-sand/70 max-w-[52ch] mx-auto">
              Leyendo el libro a tu ritmo, o acompañada en un proceso de mentoría
              diseñado para tu realidad.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <CtaRoute to="/libro" onDark>El libro · {BOOK.title}</CtaRoute>
              <CtaRoute to="/para-ti" onDark>La mentoría</CtaRoute>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
