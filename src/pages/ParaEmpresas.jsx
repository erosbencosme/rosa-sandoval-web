import { CORPORATE_SERVICES, CORPORATE_FORMATS, EXPERTISE_AREAS } from '../constants';
import ContactForm from '../components/ContactForm';
import Link from '../components/Link';
import {
  Section, SectionTitle, Eyebrow, Lead, Reveal, Hairline,
  CtaRoute, Card, PlaceholderNote,
} from '../components/ui';

// ================================================================
// ParaEmpresas.jsx — Propuesta corporativa
// ================================================================
//
// 🎯 Nota de diseño de la clienta:
//    "Esta página debe funcionar casi como una mini presentación
//     comercial de Rosa: formato visual denso en confianza (logos de
//     clientes/empresas si están disponibles, credenciales, formatos
//     disponibles) más que texto largo."
//
// Por eso la página prioriza:
//   · Escaneo rápido — un gerente de Gestión Humana decide en minutos
//   · Credenciales visibles arriba, no enterradas en un párrafo
//   · Las 7 líneas de servicio en cuadrícula, no en lista corrida
//   · Los formatos de entrega como banda propia
//   · Formulario de propuesta AL FINAL de la misma página, sin
//     obligar a saltar a Contacto
//
// ⚠️ PENDIENTE: la franja de logos de clientes está preparada pero
//    vacía. En cuanto Rosa autorice qué marcas puede mostrar, se
//    llenan en CLIENT_LOGOS y la sección aparece sola.
// ================================================================

/**
 * Logos de organizaciones con las que Rosa ha trabajado.
 * Formato: { name: 'Empresa', src: './images/clientes/empresa.png' }
 * ⚠️ Requiere autorización de cada organización antes de publicar.
 */
const CLIENT_LOGOS = [];

/** Credenciales para la barra de confianza */
const credentials = [
  { value: 'Máster', label: 'Gerencia y Productividad' },
  { value: 'Coach', label: 'Facilitadora de Formación Profesional' },
  { value: 'Autora', label: 'GPS de la Abundancia®' },
  { value: '5', label: 'Áreas de especialidad' },
];

export default function ParaEmpresas() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden"
        style={{ background: 'var(--color-rich)' }}
      >
        <div
          aria-hidden="true"
          className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.16]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <Reveal className="max-w-[46ch]">
            <Eyebrow onDark>Para empresas</Eyebrow>

            <h1 className="font-display font-light text-sand leading-[1.05] tracking-tight m-0
              text-[clamp(2.15rem,4.8vw,3.6rem)]">
              Desarrollo personas. Fortalezco equipos. Impulso{' '}
              <em className="italic font-normal text-beige">resultados</em>.
            </h1>

            <Hairline className="my-9" width="w-16" />

            <p className="text-[1.05rem] leading-[1.8] text-sand/75 max-w-[54ch]">
              Diseño experiencias de aprendizaje para organizaciones que desean
              fortalecer el bienestar, las competencias y el desempeño de sus
              colaboradores.
            </p>

            <div className="mt-10">
              <a
                href="#propuesta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('propuesta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-luxury btn-luxury--onDark"
              >
                <span>Solicitar propuesta corporativa</span>
                <span className="btn-luxury-dot" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BARRA DE CREDENCIALES ══════════════════════════════ */}
      <section className="py-8 border-b border-olive-dark/10" style={{ background: 'var(--color-silk)' }}>
        <div className="max-w-[1400px] mx-auto px-[6%]">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 m-0">
            {credentials.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="sr-only">{item.label}</dt>
                <dd className="m-0">
                  <span className="block font-display font-light text-olive-dark text-[1.6rem] leading-none mb-2">
                    {item.value}
                  </span>
                  <span className="block font-ui text-[0.68rem] uppercase tracking-[0.14em] text-olive-dark/55">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══ LOGOS DE CLIENTES (aparece cuando haya) ════════════ */}
      {CLIENT_LOGOS.length > 0 && (
        <Section background="sand" className="!py-16">
          <Reveal>
            <p className="text-center font-ui text-[0.7rem] uppercase tracking-[0.2em] text-olive-dark/50 mb-10">
              Organizaciones que han confiado
            </p>
            <ul className="list-none m-0 p-0 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {CLIENT_LOGOS.map((logo) => (
                <li key={logo.name}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-10 w-auto opacity-55 grayscale transition-all duration-500
                      hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {/* ═══ LÍNEAS DE SERVICIO ═════════════════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mb-16">
          <Eyebrow>Áreas de trabajo</Eyebrow>
          <SectionTitle>
            Lo que podemos <em>construir</em> juntos.
          </SectionTitle>
        </Reveal>

        <PlaceholderNote>
          Franja de logos de clientes vacía — llenar CLIENT_LOGOS en ParaEmpresas.jsx
          cuando haya autorización de las organizaciones.
        </PlaceholderNote>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORPORATE_SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 110}>
              <Card className="!p-8">
                <div
                  aria-hidden="true"
                  className="font-mono text-[0.7rem] tracking-[0.24em] mb-6"
                  style={{ color: 'var(--color-gilt)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 className="font-display font-normal text-olive-dark text-[1.25rem] leading-[1.3] m-0">
                  {service.title}
                </h3>

                <p className="mt-4 text-[0.96rem] leading-[1.7] text-olive-dark/75 m-0">
                  {service.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══ FORMATOS DE ENTREGA ════════════════════════════════ */}
      <Section background="silk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-center">

          <Reveal className="lg:col-span-4">
            <Eyebrow>Formatos</Eyebrow>
            <SectionTitle>
              Cómo lo <em>entregamos</em>.
            </SectionTitle>
            <Lead className="mt-7">
              Cada organización tiene su ritmo y su agenda. El formato se ajusta
              a lo que tu equipo puede sostener.
            </Lead>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {CORPORATE_FORMATS.map((format, i) => (
                <Reveal as="li" key={format} delay={i * 90}>
                  <div className="flex items-center gap-5 py-6 border-b border-olive-dark/12">
                    <span
                      aria-hidden="true"
                      className="w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: 'var(--color-gilt)' }}
                    />
                    <span className="font-display font-light text-olive-dark text-[1.3rem]">
                      {format}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══ ESPECIALIDADES ═════════════════════════════════════ */}
      <Section background="sand" width="1100px">
        <Reveal className="text-center">
          <Eyebrow align="center">Especialidades</Eyebrow>

          <ul className="list-none m-0 p-0 flex flex-wrap items-center justify-center gap-3">
            {EXPERTISE_AREAS.map((area) => (
              <li
                key={area}
                className="px-5 py-2.5 rounded-full border border-olive-dark/15
                  font-ui text-[0.78rem] tracking-[0.06em] text-olive-dark/75
                  transition-colors duration-500 hover:border-olive-dark/35"
              >
                {area}
              </li>
            ))}
          </ul>

          <p className="mt-12 text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[56ch] mx-auto">
            ¿Quieres ver evidencia de trabajos anteriores?{' '}
            <Link
              to="/testimonios"
              className="text-olive-dark underline underline-offset-4 decoration-1
                transition-colors duration-300 hover:text-olive"
            >
              Revisa los testimonios de empresas
            </Link>.
          </p>
        </Reveal>
      </Section>

      {/* ═══ SOLICITUD DE PROPUESTA ═════════════════════════════ */}
      <section id="propuesta" className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: 'var(--color-rich)' }}>

        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.13]"
          style={{ background: 'radial-gradient(circle, var(--color-gilt), transparent 65%)' }}
        />

        <div className="relative max-w-[900px] mx-auto px-[6%]">
          <Reveal className="text-center mb-14">
            <Eyebrow align="center" onDark>Siguiente paso</Eyebrow>

            <SectionTitle onDark className="!text-[clamp(2rem,4.5vw,3rem)]">
              ¿Qué necesita hoy tu <em>organización</em>?
            </SectionTitle>

            <p className="mt-8 text-lg leading-[1.75] text-sand/70 max-w-[52ch] mx-auto">
              Cuéntanos el contexto y te enviamos una propuesta ajustada al
              tamaño de tu equipo y a los objetivos del programa.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm variant="empresa" onDark />
          </Reveal>

          <Reveal delay={200} className="mt-12 text-center">
            <CtaRoute to="/sobre-rosa" onDark>Conocer a Rosa</CtaRoute>
          </Reveal>
        </div>
      </section>
    </>
  );
}
