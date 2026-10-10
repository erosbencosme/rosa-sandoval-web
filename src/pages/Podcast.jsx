import { Youtube, Headphones, Mic } from 'lucide-react';
import { PODCAST } from '../constants';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline,
  CtaLink, CtaRoute, PlaceholderNote,
} from '../components/ui';

// ================================================================
// Podcast.jsx — Nuestro Espacio Podcast
// ================================================================
//
// 🎯 Nota de diseño de la clienta:
//    "Se unificó el nombre a 'Nuestro Espacio Podcast' (consistente
//     con el canal de YouTube existente) tanto en el menú como en el
//     contenido de esta página, para evitar que el visitante piense
//     que son dos productos distintos."
//
// Por eso el nombre viene de PODCAST.name en constants.js y no se
// escribe suelto en ningún componente.
//
// ⚠️ PENDIENTE: SPOTIFY_URL está vacío en constants.js. Mientras lo
//    esté, el botón de Spotify no se renderiza — mejor un botón menos
//    que un enlace muerto en el lanzamiento.
// ================================================================

export default function Podcast() {
  const platforms = [
    { href: PODCAST.youtube, label: 'Ver en YouTube', Icon: Youtube },
    { href: PODCAST.spotify, label: 'Escuchar en Spotify', Icon: Headphones },
  ].filter((p) => Boolean(p.href));

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
        style={{ background: 'var(--color-rich)' }}
      >
        <div
          aria-hidden="true"
          className="absolute top-[-15%] left-[-8%] w-[620px] h-[620px] rounded-full blur-[140px] opacity-[0.16]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 items-center">

            <Reveal className="lg:col-span-7">
              <Eyebrow onDark>El podcast</Eyebrow>

              <h1 className="font-display font-light text-sand leading-[1.03] tracking-tight m-0
                text-[clamp(2.25rem,5.5vw,4rem)]">
                {PODCAST.name}
              </h1>

              <p className="mt-7 font-ui text-[0.78rem] uppercase tracking-[0.22em] text-beige">
                {PODCAST.tagline}
              </p>

              <Hairline className="my-9" width="w-16" />

              <p className="text-[1.05rem] leading-[1.8] text-sand/75 max-w-[54ch]">
                {PODCAST.description}
              </p>

              {platforms.length > 0 && (
                <div className="mt-11 flex flex-col sm:flex-row gap-4">
                  {platforms.map(({ href, label, Icon }) => (
                    <CtaLink key={label} href={href} onDark>
                      <Icon size={15} aria-hidden="true" className="mr-1" />
                      {label}
                    </CtaLink>
                  ))}
                </div>
              )}
            </Reveal>

            {/* Emblema tipográfico */}
            <Reveal delay={160} className="lg:col-span-5">
              <div className="relative aspect-square max-w-[380px] mx-auto flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'var(--color-gilt)', opacity: 0.35 }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-[12%] rounded-full border animate-soft-glow"
                  style={{ borderColor: 'var(--color-gilt)', opacity: 0.25 }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-[26%] rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.3), transparent 70%)' }}
                />
                <Mic
                  size={72}
                  aria-hidden="true"
                  strokeWidth={0.8}
                  className="relative text-beige/80"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TEMAS ══════════════════════════════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mb-14">
          <Eyebrow>De qué conversamos</Eyebrow>
          <SectionTitle>
            Una mirada práctica y <em>cercana</em>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={120}>
          <ul className="list-none m-0 p-0 flex flex-wrap gap-3">
            {PODCAST.topics.map((topic) => (
              <li
                key={topic}
                className="px-6 py-3 rounded-full border border-olive-dark/15
                  font-ui text-[0.82rem] tracking-[0.05em] text-olive-dark/75
                  transition-colors duration-500 hover:border-olive-dark/35"
              >
                {topic}
              </li>
            ))}
          </ul>
        </Reveal>

        <PlaceholderNote>
          Falta SPOTIFY_URL en constants.js. Los episodios embebidos también están
          pendientes: cuando se defina la plataforma, incrustar el reproductor aquí.
        </PlaceholderNote>
      </Section>

      {/* ═══ CTA ════════════════════════════════════════════════ */}
      <Section background="silk" width="900px">
        <Reveal className="text-center">
          <SectionTitle>
            ¿Te resonó algún <em>episodio</em>?
          </SectionTitle>

          <p className="mt-8 text-lg leading-[1.75] text-olive-dark/75 max-w-[50ch] mx-auto">
            Si la conversación te hizo preguntarte qué está ocurriendo con tu
            relación con el dinero, podemos seguirla en persona.
          </p>

          <div className="mt-11 flex flex-col sm:flex-row gap-4 justify-center">
            <CtaRoute to="/sesion-de-claridad">Agendar sesión de claridad</CtaRoute>
            <CtaRoute to="/blog">Leer el blog</CtaRoute>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
