import { useState, useMemo } from 'react';
import { TESTIMONIAL_CATEGORIES } from '../constants';
import { TESTIMONIALS, TESTIMONIALS_PENDING } from '../content';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline, CtaRoute, PlaceholderNote,
} from '../components/ui';

// ================================================================
// Testimonios.jsx — Evidencia organizada por lo que se contrata
// ================================================================
//
// 🎯 Nota de diseño de la clienta:
//    "Esto permite que un gerente busque directamente evidencia
//     relacionada con lo que está pensando contratar, en lugar de
//     revisar testimonios mezclados sin contexto."
//
// De ahí el filtro por categoría: Mentoría · Conferencias y talleres ·
// Empresas · Educación financiera. Las categorías vienen de
// TESTIMONIAL_CATEGORIES (constants.js) y los testimonios de
// content.js.
//
// ⚠️ Los testimonios actuales son PLACEHOLDER. Ver la nota extensa
//    al inicio de content.js sobre por qué se retiraron los
//    anteriores (eran inventados y prometían cifras concretas).
//    Mientras TESTIMONIALS_PENDING sea true, la página muestra un
//    aviso honesto en vez de presentarlos como reales.
// ================================================================

const ALL = 'todos';

export default function Testimonios() {
  const [filter, setFilter] = useState(ALL);

  // Solo mostramos categorías que tienen al menos un testimonio,
  // para que no aparezca un filtro que devuelve una lista vacía.
  const availableCategories = useMemo(
    () => TESTIMONIAL_CATEGORIES.filter((cat) =>
      TESTIMONIALS.some((t) => t.category === cat.slug)
    ),
    []
  );

  const visible = useMemo(
    () => (filter === ALL ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter)),
    [filter]
  );

  const categoryName = (slug) =>
    TESTIMONIAL_CATEGORIES.find((c) => c.slug === slug)?.name ?? '';

  const chipClass = (active) =>
    `px-5 py-2.5 rounded-full border cursor-pointer font-ui text-[0.78rem]
     tracking-[0.05em] transition-all duration-500
     focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt
     ${active
      ? 'border-olive-dark/45 bg-olive-dark text-cream'
      : 'border-olive-dark/15 bg-transparent text-olive-dark/70 hover:border-olive-dark/35 hover:text-olive-dark'}`;

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <Reveal className="max-w-[46ch]">
            <Eyebrow>Testimonios</Eyebrow>

            <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
              text-[clamp(2.15rem,4.8vw,3.6rem)]">
              Lo que dicen quienes han vivido la{' '}
              <em className="italic font-normal text-olive">experiencia</em>
            </h1>

            <Hairline className="my-9" width="w-16" />

            <p className="text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[54ch]">
              Organizados por tipo de acompañamiento, para que encuentres
              evidencia de lo que estás considerando.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FILTROS + LISTA ════════════════════════════════════ */}
      <Section background="silk" className="!pt-16">

        {TESTIMONIALS_PENDING && (
          <Reveal className="mb-14">
            <div
              className="px-7 py-6 rounded-lg border"
              style={{ borderColor: 'rgba(201,162,39,0.35)', background: 'rgba(201,162,39,0.06)' }}
            >
              <p className="font-ui text-[0.72rem] uppercase tracking-[0.18em] mb-3 m-0"
                style={{ color: 'var(--color-gilt)' }}>
                Sección en construcción
              </p>
              <p className="text-[0.98rem] leading-[1.7] text-olive-dark/75 m-0">
                Estamos recopilando y verificando los testimonios de quienes han
                participado en los procesos. Los textos que aparecen abajo
                muestran cómo se organizará esta sección.
              </p>
            </div>
          </Reveal>
        )}

        <PlaceholderNote>
          Reemplazar TESTIMONIALS en src/content.js con testimonios reales y
          autorizados, luego poner TESTIMONIALS_PENDING = false.
        </PlaceholderNote>

        {/* Filtros por categoría */}
        <Reveal className="mb-14">
          <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar testimonios por categoría">
            <button
              type="button"
              onClick={() => setFilter(ALL)}
              aria-pressed={filter === ALL}
              className={chipClass(filter === ALL)}
            >
              Todos
            </button>

            {availableCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setFilter(cat.slug)}
                aria-pressed={filter === cat.slug}
                className={chipClass(filter === cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Rejilla de testimonios */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-live="polite"
        >
          {visible.map((t, i) => (
            <Reveal key={`${t.author}-${t.text.slice(0, 24)}`} delay={(i % 2) * 110}>
              <figure
                className="group relative h-full p-9 md:p-10 rounded-lg card-glass m-0
                  transition-all duration-700 ease-out hover:-translate-y-1
                  hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]"
              >
                {/* Comilla ornamental */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 right-7 font-display italic font-light leading-none select-none"
                  style={{ color: 'var(--color-gilt)', fontSize: '3.5rem', opacity: 0.28 }}
                >
                  &ldquo;
                </span>

                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-olive-dark/50 mb-7">
                  {categoryName(t.category)}
                </div>

                <blockquote className="m-0">
                  <p className="text-[1.05rem] leading-[1.8] text-olive-dark/85 m-0">
                    {t.text}
                  </p>
                </blockquote>

                <figcaption className="mt-8 pt-7 border-t border-olive-dark/12">
                  <span className="block font-ui font-semibold text-[0.9rem] text-olive-dark">
                    {t.author}
                  </span>
                  <span className="block mt-1 font-ui text-[0.78rem] text-olive-dark/55">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-olive-dark/60 py-16 m-0">
            Aún no hay testimonios publicados en esta categoría.
          </p>
        )}
      </Section>

      {/* ═══ CTA ════════════════════════════════════════════════ */}
      <Section background="sand" width="900px">
        <Reveal className="text-center">
          <SectionTitle>
            ¿Quieres escribir el <em>tuyo</em>?
          </SectionTitle>

          <p className="mt-8 text-lg leading-[1.75] text-olive-dark/75 max-w-[50ch] mx-auto">
            Todo empieza igual: una conversación de 30 minutos, sin costo,
            para ver dónde estás y qué necesitas.
          </p>

          <div className="mt-11 flex flex-col sm:flex-row gap-4 justify-center">
            <CtaRoute to="/sesion-de-claridad">Agendar sesión de claridad</CtaRoute>
            <CtaRoute to="/para-empresas">Propuesta para empresas</CtaRoute>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
