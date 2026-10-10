import { useState, useMemo } from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_METHOD_TAGS, CAFE_CON_ROSA } from '../constants';
import { POSTS, POSTS_PENDING, formatPostDate } from '../content';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline,
  CtaRoute, PlaceholderNote,
} from '../components/ui';

// ================================================================
// Blog.jsx — "Aquí tenemos una oportunidad enorme de SEO"
// ================================================================
//
// 🎯 TAXONOMÍA — la decisión más importante de esta página.
//
// Nota de diseño de la clienta:
//    "Se unificó la taxonomía a una sola lógica temática como
//     categoría principal. En el documento original, 'Ser' y 'Hacer'
//     existían como categorías paralelas a las temáticas, lo que
//     generaba ambigüedad al clasificar un artículo […] y competencia
//     interna por las mismas palabras clave en buscadores."
//
// Traducción a la interfaz:
//   · CATEGORÍA (Dinero con Propósito, Desarrollo Personal,
//     Liderazgo, Empresas) → estructura principal, filtro primario
//   · SER · HACER · TENER → filtro SECUNDARIO que se cruza con la
//     categoría, nunca al mismo nivel
//
// Los dos filtros se combinan (categoría AND método), que es
// justamente lo que la estructura de dos niveles permite.
//
// ⚠️ SEO: con hash routing, los buscadores ven una sola URL. Cuando
//    el blog empiece a producir contenido real, esto se vuelve el
//    argumento fuerte para migrar a rutas reales. Ver router.jsx.
// ================================================================

const ALL = 'todos';

export default function Blog() {
  const [category, setCategory] = useState(ALL);
  const [method, setMethod] = useState(ALL);

  const cafePosts = useMemo(() => POSTS.filter((p) => p.cafe), []);
  const regularPosts = useMemo(() => POSTS.filter((p) => !p.cafe), []);

  const visible = useMemo(
    () => regularPosts.filter((p) =>
      (category === ALL || p.category === category) &&
      (method === ALL || p.method === method)
    ),
    [regularPosts, category, method]
  );

  const categoryName = (slug) =>
    BLOG_CATEGORIES.find((c) => c.slug === slug)?.name ?? '';

  const chipClass = (active) =>
    `px-5 py-2.5 rounded-full border cursor-pointer font-ui text-[0.78rem]
     tracking-[0.05em] transition-all duration-500
     focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt
     ${active
      ? 'border-olive-dark/45 bg-olive-dark text-cream'
      : 'border-olive-dark/15 bg-transparent text-olive-dark/70 hover:border-olive-dark/35 hover:text-olive-dark'}`;

  const methodChipClass = (active) =>
    `px-4 py-2 rounded-full border cursor-pointer font-mono text-[0.7rem]
     tracking-[0.16em] uppercase transition-all duration-500
     focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt
     ${active
      ? 'text-olive-dark'
      : 'border-olive-dark/12 text-olive-dark/55 hover:text-olive-dark hover:border-olive-dark/30'}`;

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
            <Eyebrow>Blog</Eyebrow>

            <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
              text-[clamp(2.15rem,4.8vw,3.6rem)]">
              Ideas para decidir con más{' '}
              <em className="italic font-normal text-olive">conciencia</em>
            </h1>

            <Hairline className="my-9" width="w-16" />

            <p className="text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[54ch]">
              Artículos sobre dinero, desarrollo personal, liderazgo y desarrollo
              de equipos. Contenido para empezar tu transformación hoy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CAFÉ CON ROSA — sección destacada ══════════════════ */}
      {/* 🎯 "Debe tener presencia visual fuerte dentro de la página de
             Blog (banner, color distintivo o carrusel destacado) para
             diferenciarse claramente de los artículos temáticos
             regulares, sin necesidad de ocupar un ítem propio en el
             menú principal." */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'var(--color-rich)' }}>
        <div
          aria-hidden="true"
          className="absolute top-[-30%] right-[5%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 items-start">

            <Reveal className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-7">
                <Coffee size={20} aria-hidden="true" style={{ color: 'var(--color-gilt)' }} />
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-sand/55">
                  Serie destacada
                </span>
              </div>

              <h2 className="font-display font-light text-sand leading-[1.08] tracking-tight m-0
                text-[clamp(1.9rem,3.6vw,2.75rem)]">
                {CAFE_CON_ROSA.name}
              </h2>

              <p className="mt-4 font-ui text-[0.72rem] uppercase tracking-[0.22em] text-beige">
                {CAFE_CON_ROSA.tagline}
              </p>

              <p className="mt-7 text-[1rem] leading-[1.8] text-sand/70">
                {CAFE_CON_ROSA.description}
              </p>
            </Reveal>

            {/* Entradas de la serie */}
            <div className="lg:col-span-8 space-y-0">
              {cafePosts.map((post, i) => (
                <Reveal key={post.title} delay={i * 110}>
                  <article className="group py-7 border-b border-sand/12 first:pt-0">
                    <div className="flex items-baseline gap-5 mb-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sand/40">
                        {formatPostDate(post.date)}
                      </span>
                      <span aria-hidden="true" className="text-sand/20">·</span>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sand/40">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-light text-sand text-[clamp(1.3rem,2.4vw,1.75rem)]
                      leading-[1.25] m-0 transition-colors duration-500 group-hover:text-beige">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-[0.98rem] leading-[1.7] text-sand/60 max-w-[62ch] m-0">
                      {post.excerpt}
                    </p>

                    {!post.url && (
                      <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.2em]
                        uppercase text-sand/35">
                        Próximamente
                      </span>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 🎯 "Esta sección es el lugar natural para capturar
                 suscripciones de correo — es contenido reflexivo que
                 construye relación a largo plazo sin pedir una
                 decisión de compra inmediata."

                 ⚠️ PENDIENTE: no se monta un campo de email todavía
                 porque no hay lista de correo conectada. Un formulario
                 que no envía a ninguna parte es exactamente el error
                 que tenía el popup anterior. Cuando exista Mailchimp,
                 Brevo o similar, va aquí. */}
        </div>
      </section>

      {/* ═══ ARTÍCULOS ══════════════════════════════════════════ */}
      <Section background="silk">

        {POSTS_PENDING && (
          <Reveal className="mb-14">
            <div
              className="px-7 py-6 rounded-lg border"
              style={{ borderColor: 'rgba(201,162,39,0.35)', background: 'rgba(201,162,39,0.06)' }}
            >
              <p className="font-ui text-[0.72rem] uppercase tracking-[0.18em] mb-3 m-0"
                style={{ color: 'var(--color-gilt)' }}>
                Blog en preparación
              </p>
              <p className="text-[0.98rem] leading-[1.7] text-olive-dark/75 m-0">
                Los primeros artículos se publicarán próximamente. Los títulos de
                abajo muestran las líneas temáticas que trabajaremos.
              </p>
            </div>
          </Reveal>
        )}

        <PlaceholderNote>
          Reemplazar POSTS en src/content.js con artículos reales (y su `url`),
          luego poner POSTS_PENDING = false.
        </PlaceholderNote>

        {/* ── Filtro primario: categorías temáticas ── */}
        <Reveal className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/50 mb-5">
            Categorías
          </p>

          <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por categoría">
            <button
              type="button"
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
              className={chipClass(category === ALL)}
            >
              Todas
            </button>

            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setCategory(cat.slug)}
                aria-pressed={category === cat.slug}
                title={cat.description}
                className={chipClass(category === cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Filtro secundario: metodología ── */}
        {/* Visualmente subordinado a propósito: tipografía mono más
            pequeña y borde más tenue. No compite con las categorías. */}
        <Reveal delay={90} className="mb-14 pb-10 border-b border-olive-dark/12">
          <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/40 mb-4">
            Filtrar además por movimiento
          </p>

          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filtrar por movimiento de la metodología">
            <button
              type="button"
              onClick={() => setMethod(ALL)}
              aria-pressed={method === ALL}
              className={methodChipClass(method === ALL)}
              style={method === ALL ? { borderColor: 'var(--color-gilt)' } : undefined}
            >
              Todos
            </button>

            {BLOG_METHOD_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setMethod(tag)}
                aria-pressed={method === tag}
                className={methodChipClass(method === tag)}
                style={method === tag ? { borderColor: 'var(--color-gilt)' } : undefined}
              >
                {tag}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Rejilla de artículos ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {visible.map((post, i) => {
            const Wrapper = post.url ? 'a' : 'article';
            const wrapperProps = post.url
              ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Reveal key={post.title} delay={(i % 3) * 110}>
                <Wrapper
                  {...wrapperProps}
                  className={`group flex flex-col h-full p-8 rounded-lg card-glass no-underline
                    transition-all duration-700 ease-out
                    ${post.url ? 'hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(28,45,31,0.35)]' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
                      style={{ color: 'var(--color-gilt)' }}>
                      {categoryName(post.category)}
                    </span>
                    <span aria-hidden="true" className="text-olive-dark/20">·</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-olive-dark/45">
                      {post.method}
                    </span>
                  </div>

                  <h3 className="font-display font-light text-olive-dark text-[1.3rem] leading-[1.3] m-0
                    transition-colors duration-500 group-hover:text-olive">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-[0.95rem] leading-[1.7] text-olive-dark/70 flex-1 m-0">
                    {post.excerpt}
                  </p>

                  <div className="mt-7 pt-5 border-t border-olive-dark/10 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-olive-dark/45">
                      {formatPostDate(post.date)} · {post.readTime}
                    </span>

                    {post.url ? (
                      <ArrowRight size={15} aria-hidden="true"
                        className="text-olive-dark/50 transition-transform duration-500 group-hover:translate-x-1" />
                    ) : (
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-olive-dark/35">
                        Próximamente
                      </span>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-olive-dark/60 py-16 m-0">
            No hay artículos que combinen esos dos filtros. Prueba con otra combinación.
          </p>
        )}
      </Section>

      {/* ═══ CTA DUAL ═══════════════════════════════════════════ */}
      {/* 🎯 El documento define dos llamados al final de cada artículo:
             uno individual y uno empresarial. Mientras no existan
             páginas de artículo, viven aquí, al cierre del listado. */}
      <Section background="sand">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <Reveal>
            <div className="h-full p-9 md:p-11 rounded-lg card-glass">
              <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/50 mb-6">
                Para ti
              </div>

              <p className="text-[1.05rem] leading-[1.8] text-olive-dark/80 m-0">
                Si este tema te hizo preguntarte qué está ocurriendo realmente con
                tu relación con el dinero, puedes comenzar con una Sesión de Claridad.
              </p>

              <div className="mt-9">
                <CtaRoute to="/sesion-de-claridad">Agendar sesión de claridad</CtaRoute>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="h-full p-9 md:p-11 rounded-lg" style={{ background: 'var(--color-rich)' }}>
              <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-sand/50 mb-6">
                Para tu organización
              </div>

              <p className="text-[1.05rem] leading-[1.8] text-sand/80 m-0">
                ¿Estás buscando una experiencia de liderazgo para tu organización?
              </p>

              <div className="mt-9">
                <CtaRoute to="/para-empresas" onDark>Conocer programas para empresas</CtaRoute>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
