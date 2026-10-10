import { useState } from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import {
  CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_DISPLAY,
  WHATSAPP_MESSAGE, LOCATION, GOOGLE_FORM_URL,
} from '../constants';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline, CtaLink,
} from '../components/ui';

// ================================================================
// Contacto.jsx — "Hablemos"
// ================================================================
//
// El documento define TRES rutas de contacto distintas:
//   · Para mentoría        → Agendar sesión de claridad
//   · Para empresas        → Solicitar propuesta
//   · Para conferencias    → Contactar
//
// En vez de tres páginas o tres formularios apilados, se resuelven
// con un selector: el visitante declara qué necesita y el formulario
// se adapta (los campos y el asunto del correo cambian). Así Rosa
// recibe las solicitudes ya clasificadas y el visitante solo ve los
// campos que le corresponden.
// ================================================================

const routes = [
  {
    id: 'individual',
    label: 'Para mentoría',
    title: 'Quiero trabajar con Rosa',
    description:
      'Acompañamiento individual para transformar tu relación con el dinero y liderar tus resultados.',
  },
  {
    id: 'empresa',
    label: 'Para empresas',
    title: 'Solicitar una propuesta',
    description:
      'Programas de formación, bienestar financiero y liderazgo para equipos y organizaciones.',
  },
  {
    id: 'conferencia',
    label: 'Conferencias y eventos',
    title: 'Invitar a Rosa a un evento',
    description:
      'Conferencias, jornadas y cápsulas de aprendizaje para congresos, universidades y eventos corporativos.',
  },
];

export default function Contacto() {
  const [active, setActive] = useState('individual');
  const activeRoute = routes.find((r) => r.id === active);

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <Reveal className="max-w-[44ch]">
            <Eyebrow>Contacto</Eyebrow>

            <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
              text-[clamp(2.5rem,5.5vw,4rem)]">
              <em className="italic font-normal text-olive">Hablemos</em>
            </h1>

            <Hairline className="my-9" width="w-16" />

            <p className="text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[52ch]">
              ¿Tienes una pregunta, quieres trabajar conmigo o deseas llevar una
              experiencia a tu organización? Estoy aquí para escucharte.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SELECTOR + FORMULARIO ══════════════════════════════ */}
      <Section background="silk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-14 items-start">

          {/* ── Columna izquierda: rutas y datos directos ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">

            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/50 mb-6">
                ¿Qué necesitas?
              </p>

              <div className="space-y-3" role="group" aria-label="Tipo de consulta">
                {routes.map((route) => {
                  const isActive = active === route.id;
                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => setActive(route.id)}
                      aria-pressed={isActive}
                      className={`w-full text-left p-6 rounded-lg border cursor-pointer
                        transition-all duration-500 ease-out
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt
                        ${isActive
                          ? 'border-olive-dark/30 bg-white/70 shadow-[0_18px_40px_-28px_rgba(28,45,31,0.4)]'
                          : 'border-olive-dark/12 bg-transparent hover:border-olive-dark/25 hover:bg-white/40'}`}
                    >
                      <span className="flex items-center gap-3 mb-2">
                        <span
                          aria-hidden="true"
                          className="w-[6px] h-[6px] rounded-full shrink-0 transition-opacity duration-500"
                          style={{
                            background: 'var(--color-gilt)',
                            opacity: isActive ? 1 : 0.3,
                          }}
                        />
                        <span className={`font-ui text-[0.7rem] uppercase tracking-[0.16em]
                          ${isActive ? 'text-olive-dark' : 'text-olive-dark/50'}`}>
                          {route.label}
                        </span>
                      </span>

                      <span className={`block font-display font-light text-[1.2rem] leading-[1.3]
                        ${isActive ? 'text-olive-dark' : 'text-olive-dark/70'}`}>
                        {route.title}
                      </span>

                      <span className={`block mt-2 text-[0.9rem] leading-[1.65]
                        ${isActive ? 'text-olive-dark/70' : 'text-olive-dark/45'}`}>
                        {route.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Datos de contacto directo */}
            <Reveal delay={140} className="mt-12 pt-10 border-t border-olive-dark/12">
              <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-olive-dark/50 mb-6">
                O escríbeme directo
              </p>

              <ul className="list-none m-0 p-0 space-y-4">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-start gap-3 text-[0.95rem] text-olive-dark/75
                      no-underline transition-colors duration-300 hover:text-olive-dark break-all"
                  >
                    <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-gilt)' }} />
                    {CONTACT_EMAIL}
                  </a>
                </li>

                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[0.95rem] text-olive-dark/75
                      no-underline transition-colors duration-300 hover:text-olive-dark"
                  >
                    <MessageCircle size={16} aria-hidden="true" className="shrink-0"
                      style={{ color: 'var(--color-gilt)' }} />
                    {WHATSAPP_DISPLAY}
                  </a>
                </li>

                <li className="inline-flex items-center gap-3 text-[0.95rem] text-olive-dark/75">
                  <MapPin size={16} aria-hidden="true" className="shrink-0"
                    style={{ color: 'var(--color-gilt)' }} />
                  {LOCATION}
                </li>
              </ul>
            </Reveal>
          </div>

          {/* ── Columna derecha: el formulario ── */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="mb-10">
                <SectionTitle className="!text-[clamp(1.7rem,3.2vw,2.35rem)]">
                  {activeRoute.title}
                </SectionTitle>
              </div>

              {/* key fuerza el remontaje al cambiar de ruta: los campos
                  cambian y no queremos arrastrar valores del formulario
                  anterior ni errores de validación viejos. */}
              <ContactForm key={active} variant={active} />
            </Reveal>

            {/* Atajo al Google Form para quien viene a agendar */}
            {active === 'individual' && (
              <Reveal delay={180} className="mt-12 pt-10 border-t border-olive-dark/12">
                <p className="text-[0.95rem] text-olive-dark/60 m-0 mb-6">
                  ¿Prefieres agendar directamente la sesión de claridad?
                </p>
                <CtaLink href={GOOGLE_FORM_URL}>Agendar por formulario</CtaLink>
              </Reveal>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
