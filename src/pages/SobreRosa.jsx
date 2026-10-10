import { ROSA_PORTRAIT_PATH, BRAND, EXPERTISE_AREAS } from '../constants';
import {
  Section, SectionTitle, Eyebrow, Reveal, Hairline,
  CtaRoute, CtaSolid, Prose,
} from '../components/ui';

// ================================================================
// SobreRosa.jsx — "Una vida de aprendizaje, servicio y propósito"
// ================================================================
//
// El texto es el que entregó Rosa, íntegro y sin recortar. Está
// escrito en primera persona y su fuerza está en el ritmo, así que
// la maquetación se limita a darle aire: columna estrecha (≈68
// caracteres), interlineado amplio y una cita destacada al cierre.
//
// Credenciales y áreas de trabajo se extraen a una columna lateral
// para que un visitante que sólo escanea capte la formación sin
// leer los ocho párrafos.
// ================================================================

/** Formación académica y certificaciones */
const credentials = [
  'Licenciada en Administración de Empresas',
  'Máster en Gerencia y Productividad',
  'Coach y Facilitadora de Formación Profesional',
  `Autora y creadora de ${BRAND.methodology}`,
];

/** Roles profesionales */
const roles = ['Docente', 'Facilitadora', 'Coach', 'Conferencista', 'Escritora'];

export default function SobreRosa() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-14 items-center">

            <Reveal className="lg:col-span-7">
              <Eyebrow>Sobre Rosa</Eyebrow>

              <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
                text-[clamp(2.25rem,5vw,3.75rem)]">
                Una vida de aprendizaje, servicio y{' '}
                <em className="italic font-normal text-olive">propósito</em>
              </h1>

              <Hairline className="my-9" width="w-16" />

              {/* Roles */}
              <ul className="list-none m-0 p-0 flex flex-wrap gap-x-6 gap-y-2">
                {roles.map((role) => (
                  <li key={role} className="font-ui text-[0.72rem] uppercase tracking-[0.16em] text-olive-dark/60">
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-5">
              <div className="relative w-full max-w-[420px] mx-auto">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-4 translate-y-4 rounded-sm border"
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

      {/* ═══ BIOGRAFÍA ══════════════════════════════════════════ */}
      <Section background="silk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-14">

          {/* Columna lateral: credenciales */}
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-7">
              Formación
            </div>

            <ul className="list-none m-0 p-0 space-y-5 mb-12">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.65em] w-[5px] h-[5px] rounded-full shrink-0"
                    style={{ background: 'var(--color-gilt)' }}
                  />
                  <span className="text-[0.98rem] leading-[1.65] text-olive-dark/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-7">
              Áreas de trabajo
            </div>

            <ul className="list-none m-0 p-0 space-y-3">
              {EXPERTISE_AREAS.map((area) => (
                <li key={area} className="font-ui text-[0.85rem] tracking-[0.04em] text-olive-dark/70">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Columna principal: el texto de Rosa */}
          <Reveal delay={120} className="lg:col-span-8">
            <Prose>
              <p>
                Soy Rosa Sandoval Polanco, docente, facilitadora, coach, conferencista
                y escritora. Soy Licenciada en Administración de Empresas, Máster en
                Gerencia y Productividad, Coach y Facilitadora de Formación Profesional.
              </p>

              <p>
                Autora y creadora de la metodología <strong>GPS de la Abundancia®</strong>,
                una propuesta que forma parte de mi manera de acompañar a las personas
                en la construcción de una vida con mayor conciencia, propósito y bienestar.
              </p>

              <p>
                Mi experiencia empresarial y mi pasión por la formación me han permitido
                acompañar a personas, equipos y organizaciones en procesos de aprendizaje
                y desarrollo.
              </p>

              <p>
                A lo largo de este camino he comprendido que las personas no necesitan
                solamente información; necesitan claridad, nuevas perspectivas y
                herramientas que les ayuden a transformar lo que saben en decisiones
                y acciones.
              </p>

              <p>
                Por eso, mi trabajo integra educación financiera, desarrollo personal,
                liderazgo, emprendimiento, ventas y desarrollo comercial, y servicio
                al cliente, creando experiencias de aprendizaje conectadas con las
                necesidades reales de las personas y las organizaciones.
              </p>

              <p>
                Mi propósito es acompañar a las personas a liderar su vida, tomar
                mejores decisiones y construir resultados con mayor conciencia y propósito.
              </p>

              <p>
                En las organizaciones, contribuyo al desarrollo de personas y equipos
                mediante conferencias, talleres, programas formativos y experiencias
                de aprendizaje que inspiran, generan reflexión y movilizan a la acción.
              </p>

              <p>
                Porque cuando una persona transforma su manera de pensar y actuar,
                también puede transformar sus resultados y su entorno.
              </p>
            </Prose>

            {/* Firma + invitación de cierre */}
            <div className="mt-14 pt-12 border-t border-olive-dark/12">
              <p className="font-display italic font-light text-olive-dark
                text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.5] m-0 max-w-[24ch]">
                Soy Rosa Sandoval Polanco.
              </p>

              <p className="mt-7 text-[1.05rem] leading-[1.8] text-olive-dark/75 max-w-[58ch]">
                Te invito a transformarte, liderar tu vida y construir resultados
                con propósito, impactando positivamente tu entorno.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                <CtaSolid to="/sesion-de-claridad">Agendar sesión de claridad</CtaSolid>
                <CtaRoute to="/gps-de-la-abundancia">Conocer la metodología</CtaRoute>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══ CIERRE ═════════════════════════════════════════════ */}
      <Section background="sand" width="900px">
        <Reveal className="text-center">
          <SectionTitle>
            ¿Trabajamos <em>juntos</em>?
          </SectionTitle>

          <p className="mt-8 text-lg leading-[1.75] text-olive-dark/75 max-w-[52ch] mx-auto">
            Ya sea de forma individual o para tu organización, el primer paso
            siempre es una conversación.
          </p>

          <div className="mt-11 flex flex-col sm:flex-row gap-4 justify-center">
            <CtaRoute to="/para-ti">Para ti</CtaRoute>
            <CtaRoute to="/para-empresas">Para tu empresa</CtaRoute>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
