import { ArrowRight } from 'lucide-react';
import Link from '../components/Link';
import {
  BRAND,
  EXPERTISE_AREAS,
  GPS_PILLARS,
  ROSA_PORTRAIT_PATH,
  BOOK,
  PODCAST,
} from '../constants';
import {
  Section, SectionTitle, Eyebrow, Lead, Reveal, Hairline,
  CtaRoute, CtaSolid, Card,
} from '../components/ui';

// ================================================================
// Home.jsx — Página de inicio
// ================================================================
//
// Estructura pedida en el documento de arquitectura:
//
//   1. Hero "Aquí conectamos" + tagline + DOS BOTONES
//      (individual vs. empresa)
//   2. Barra de áreas de expertise
//   3. Bloque de acceso a GPS de la Abundancia®
//      — para que el activo de marca no dependa solo del menú
//   4. Puertas de entrada: Para Ti / Para Empresas
//   5. Recursos: libro y podcast
//   6. CTA final a la Sesión de Claridad
//
// 🎯 Nota de diseño de la clienta:
//    "Un gerente de Gestión Humana que entra a la página debe
//     identificar en cinco segundos dónde contratarte."
//    De ahí que los dos botones estén en el primer scroll, con el
//    mismo peso visual — ninguno de los dos públicos es secundario.
// ================================================================

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        {/* Hairline marginal — firma editorial */}
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        {/* Glow gilt suave detrás del retrato */}
        <div
          aria-hidden="true"
          className="absolute top-[10%] right-[-5%] w-[520px] h-[520px] rounded-full blur-[120px] opacity-[0.13] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-center">

            {/* ── Columna de texto ── */}
            <div className="lg:col-span-7 animate-fadeInUp">
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive-dark/55 mb-8 flex items-center gap-4">
                <span aria-hidden="true" className="block w-10 h-px shrink-0" style={{ background: 'var(--color-gilt)' }} />
                {BRAND.name}
              </div>

              <h1 className="font-display font-light text-olive-dark leading-[1.02] tracking-tight m-0
                text-[clamp(2.5rem,6.5vw,4.75rem)]">
                Aquí <em className="italic font-normal text-olive">conectamos</em>.
              </h1>

              <p className="mt-8 font-display font-light text-[clamp(1.15rem,2.2vw,1.5rem)]
                leading-[1.5] text-olive-dark/85 max-w-[26ch]">
                {BRAND.tagline}
              </p>

              <Hairline className="my-8" />

              <p className="text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[52ch]">
                Te acompaño a desarrollar una relación más consciente con el dinero,
                contigo misma y con los resultados que quieres construir.
              </p>

              {/* ── DOS BOTONES — la decisión clave del hero ── */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                <CtaSolid to="/para-ti">
                  Quiero trabajar con Rosa
                </CtaSolid>

                <CtaRoute to="/para-empresas">
                  Soy una empresa
                </CtaRoute>
              </div>
            </div>

            {/* ── Retrato ── */}
            <div className="lg:col-span-5 animate-fadeInUp delay-200 order-first lg:order-last">
              <div className="relative w-full max-w-[460px] mx-auto">
                {/* Marco desplazado — profundidad editorial sin sombra pesada */}
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ÁREAS DE EXPERTISE ═════════════════════════════════ */}
      <section className="py-10 border-y border-olive-dark/10" style={{ background: 'var(--color-silk)' }}>
        <div className="max-w-[1400px] mx-auto px-[6%]">
          <ul className="list-none m-0 p-0 flex flex-wrap items-center justify-center
            gap-x-8 gap-y-3 text-center">
            {EXPERTISE_AREAS.map((area, i) => (
              <li key={area} className="flex items-center gap-8">
                <span className="font-ui text-[0.72rem] tracking-[0.16em] uppercase text-olive-dark/65">
                  {area}
                </span>
                {i < EXPERTISE_AREAS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block w-1 h-1 rounded-full"
                    style={{ background: 'var(--color-gilt)' }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ GPS DE LA ABUNDANCIA® ══════════════════════════════ */}
      {/* Bloque pedido explícitamente para que la marca no dependa
          únicamente del menú de navegación. */}
      <Section background="sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-center">

          <Reveal className="lg:col-span-5">
            <Eyebrow>La metodología</Eyebrow>
            <SectionTitle>
              GPS de la <em>Abundancia</em>®
            </SectionTitle>
            <Lead className="mt-8">
              Una metodología para aprender a dirigir tu vida desde el SER,
              el HACER y el TENER.
            </Lead>
            <div className="mt-10">
              <CtaRoute to="/gps-de-la-abundancia">
                Conocer GPS de la Abundancia®
              </CtaRoute>
            </div>
          </Reveal>

          {/* Los tres movimientos, en versión compacta */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {GPS_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.label} delay={i * 120}>
                <Card className="!p-7">
                  <div
                    aria-hidden="true"
                    className="font-display italic font-light leading-none mb-5 select-none"
                    style={{ color: 'var(--color-gilt)', fontSize: '2.5rem', opacity: 0.75 }}
                  >
                    {pillar.numeral}
                  </div>

                  <h3 className="font-display font-light text-olive-dark text-[1.75rem] leading-none m-0 mb-4">
                    {pillar.label}
                  </h3>

                  <p className="text-[0.95rem] leading-[1.7] text-olive-dark/75 m-0">
                    {pillar.short}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ DOS PUERTAS DE ENTRADA ═════════════════════════════ */}
      <Section background="silk">
        <Reveal className="max-w-3xl mb-16">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <SectionTitle>
            Dos caminos, un mismo <em>propósito</em>.
          </SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Para Ti */}
          <Reveal>
            <Link
              to="/para-ti"
              className="group block h-full no-underline card-glass rounded-lg p-9 md:p-11
                transition-all duration-700 ease-out hover:-translate-y-1
                hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]"
            >
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-6">
                I · Para ti
              </div>

              <h3 className="font-display font-light text-olive-dark text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.15] m-0">
                Mentoría individual
              </h3>

              <p className="mt-6 text-[1.02rem] leading-[1.75] text-olive-dark/75">
                Un espacio personalizado para revisar tu situación, identificar
                oportunidades de mejora y construir acciones concretas de acuerdo
                con tu realidad y tus objetivos.
              </p>

              <span className="mt-8 inline-flex items-center gap-3 font-ui text-[0.75rem]
                uppercase tracking-[0.16em] text-olive-dark">
                Ver la mentoría
                <ArrowRight size={15} aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          {/* Para Empresas */}
          <Reveal delay={140}>
            <Link
              to="/para-empresas"
              className="group block h-full no-underline rounded-lg p-9 md:p-11
                transition-all duration-700 ease-out hover:-translate-y-1
                hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.5)]"
              style={{ background: 'var(--color-rich)' }}
            >
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-sand/55 mb-6">
                II · Para empresas
              </div>

              <h3 className="font-display font-light text-sand text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.15] m-0">
                Programas para organizaciones
              </h3>

              <p className="mt-6 text-[1.02rem] leading-[1.75] text-sand/70">
                Conferencias, talleres y programas formativos para organizaciones
                que desean fortalecer el bienestar, las competencias y el
                desempeño de sus colaboradores.
              </p>

              <span className="mt-8 inline-flex items-center gap-3 font-ui text-[0.75rem]
                uppercase tracking-[0.16em] text-beige">
                Ver propuesta corporativa
                <ArrowRight size={15} aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ═══ RECURSOS ═══════════════════════════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mb-16">
          <Eyebrow>Recursos</Eyebrow>
          <SectionTitle>
            Para seguir <em>conversando</em>.
          </SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* El libro */}
          <Reveal>
            <Card className="flex flex-col sm:flex-row gap-8 items-start">
              <img
                src={BOOK.coverSrc}
                alt={`Portada del libro ${BOOK.title}`}
                loading="lazy"
                className="w-32 shrink-0 rounded-sm shadow-[0_20px_40px_-20px_rgba(28,45,31,0.45)]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              <div>
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-4">
                  El libro
                </div>

                <h3 className="font-display font-light text-olive-dark text-[1.75rem] leading-[1.15] m-0">
                  {BOOK.title}
                </h3>

                <p className="mt-5 text-[0.98rem] leading-[1.7] text-olive-dark/75">
                  {BOOK.tagline}
                </p>

                <div className="mt-7">
                  <CtaRoute to="/libro">Conocer el libro</CtaRoute>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* El podcast */}
          <Reveal delay={140}>
            <Card>
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-4">
                El podcast
              </div>

              <h3 className="font-display font-light text-olive-dark text-[1.75rem] leading-[1.15] m-0">
                {PODCAST.name}
              </h3>

              <p className="mt-3 font-ui text-[0.72rem] uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-gilt)' }}>
                {PODCAST.tagline}
              </p>

              <p className="mt-5 text-[0.98rem] leading-[1.7] text-olive-dark/75">
                {PODCAST.description}
              </p>

              <div className="mt-7">
                <CtaRoute to="/podcast">Escuchar el podcast</CtaRoute>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ background: 'var(--color-rich)' }}>
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[900px] mx-auto px-[6%] text-center">
          <Reveal>
            <Eyebrow align="center" onDark>Primer paso</Eyebrow>

            <SectionTitle onDark className="!text-[clamp(2rem,4.5vw,3.25rem)]">
              Una conversación puede darte <em>claridad</em>.
            </SectionTitle>

            <p className="mt-8 text-lg leading-[1.75] text-sand/70 max-w-[54ch] mx-auto">
              30 minutos, sin costo y sin compromiso, para mirar dónde estás
              y qué necesitas transformar.
            </p>

            <div className="mt-11 flex justify-center">
              <CtaRoute to="/sesion-de-claridad" onDark>
                Agendar sesión de claridad
              </CtaRoute>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
