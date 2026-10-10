import Faq from '../components/Faq';
import GpsTimeline from '../components/GpsTimeline';
import {
  Section, SectionTitle, Eyebrow, Lead, Reveal, Hairline,
  CtaRoute, CtaSolid, Card,
} from '../components/ui';

// ================================================================
// ParaTi.jsx — Mentoría individual
// ================================================================
//
// "Un espacio para transformar tu relación con el dinero y liderar
//  tus resultados."
//
// Las 6 preguntas frecuentes son las del documento de arquitectura,
// incluidas las dos nuevas: el precio de la mentoría y su alcance
// (no es solo para personas con deudas).
//
// ⚠️ Sobre la pregunta del precio: la respuesta orienta sin publicar
//    una tarifa fija, exactamente como pidió la clienta. No inventar
//    cifras aquí.
// ================================================================

const faqs = [
  {
    question: '¿Cómo funciona la mentoría individual?',
    answer:
      'Sesiones personalizadas de 60 minutos semanales, más mensajes cortos por WhatsApp en caso necesario. Diseñamos un plan específico adaptado a tus objetivos financieros y trabajamos juntos para alcanzar tus metas.',
  },
  {
    question: '¿Qué incluye la sesión de claridad gratuita?',
    answer:
      'Es una llamada de 30 minutos donde evaluamos tu situación financiera actual, identificamos tus principales retos y definimos un plan de acción inicial. Sin compromiso, ni presión de compra.',
  },
  {
    question: '¿Necesito saber de finanzas?',
    answer:
      'No. Partimos desde tu realidad y utilizamos un lenguaje claro y práctico. El objetivo no es llenarte de conceptos financieros, sino ayudarte a comprender y tomar mejores decisiones.',
  },
  {
    question: '¿La mentoría es solamente para personas con problemas de deudas?',
    answer:
      'No. La mentoría puede ser útil tanto para quien necesita organizar sus finanzas como para quien desea mejorar sus hábitos, planificar, ahorrar, tomar mejores decisiones o construir una relación más consciente con su dinero.',
  },
  {
    question: '¿La mentoría garantiza que voy a tener más dinero?',
    answer:
      'La mentoría no promete resultados financieros automáticos ni fórmulas mágicas. Te proporciona acompañamiento, educación y herramientas para que puedas tomar decisiones más conscientes y responsables con tus recursos.',
  },
  {
    question: '¿Cuánto cuesta la mentoría?',
    answer:
      'La inversión se define según el plan que diseñemos juntas en la sesión de claridad, de acuerdo con tus objetivos y el alcance del acompañamiento. La sesión de claridad no tiene costo ni compromiso.',
  },
];

/** Qué incluye el acompañamiento */
const included = [
  {
    numeral: 'I',
    title: 'Sesiones semanales de 60 minutos',
    body: 'Un espacio fijo en tu semana para revisar, decidir y ajustar el rumbo con acompañamiento.',
  },
  {
    numeral: 'II',
    title: 'Plan diseñado para tu realidad',
    body: 'No un programa estándar: un plan construido a partir de tus objetivos, tus tiempos y tu contexto.',
  },
  {
    numeral: 'III',
    title: 'Acompañamiento entre sesiones',
    body: 'Mensajes cortos por WhatsApp cuando aparece una decisión que no puede esperar a la próxima sesión.',
  },
];

export default function ParaTi() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <Reveal className="max-w-[46ch]">
            <Eyebrow>Para ti</Eyebrow>

            <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
              text-[clamp(2.15rem,4.8vw,3.6rem)]">
              Un espacio para transformar tu relación con el dinero y liderar tus{' '}
              <em className="italic font-normal text-olive">resultados</em>
            </h1>

            <Hairline className="my-9" width="w-16" />

            <Lead>
              Te acompaño a encontrar claridad, ordenar tus decisiones y construir
              una relación más saludable y consciente con el dinero.
            </Lead>

            <div className="mt-10">
              <CtaSolid to="/sesion-de-claridad">Agendar sesión de claridad</CtaSolid>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MENTORÍA INDIVIDUAL ════════════════════════════════ */}
      <Section background="silk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-14 items-start">

          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <Eyebrow>El acompañamiento</Eyebrow>

            <SectionTitle>Mentoría <em>individual</em></SectionTitle>

            <p className="mt-8 font-display font-light text-[clamp(1.15rem,2vw,1.4rem)]
              leading-[1.55] text-olive-dark/85 max-w-[28ch]">
              Una conversación puede darte claridad. Un proceso puede ayudarte
              a transformar tus decisiones.
            </p>

            <p className="mt-7 text-[1.02rem] leading-[1.8] text-olive-dark/75 max-w-[52ch]">
              La mentoría es un espacio personalizado para revisar tu situación,
              identificar oportunidades de mejora y construir acciones concretas
              de acuerdo con tu realidad y tus objetivos.
            </p>
          </Reveal>

          <div className="lg:col-span-7 space-y-6">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <Card className="!p-8 flex items-start gap-7">
                  <div
                    aria-hidden="true"
                    className="font-display italic font-light leading-none shrink-0 select-none pt-1"
                    style={{ color: 'var(--color-gilt)', fontSize: '2rem', opacity: 0.75 }}
                  >
                    {item.numeral}
                  </div>

                  <div>
                    <h3 className="font-display font-normal text-olive-dark text-[1.3rem] leading-[1.3] m-0">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-[1.7] text-olive-dark/75 m-0">
                      {item.body}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ LA METODOLOGÍA EN EL PROCESO ═══════════════════════ */}
      <Section background="sand">
        <Reveal className="max-w-3xl mx-auto text-center mb-20">
          <Eyebrow align="center">La ruta · III movimientos</Eyebrow>

          <SectionTitle>
            El camino de la <em>transformación</em>.
          </SectionTitle>

          <p className="mt-8 text-lg leading-[1.75] text-olive-dark/75 max-w-[54ch] mx-auto">
            Un mapa — de adentro hacia afuera — que reorienta tu relación con el
            dinero y la vida que sostiene. Tres pasos, un solo eje: el tuyo.
          </p>
        </Reveal>

        <GpsTimeline variant="full" />

        <Reveal className="mt-16 text-center">
          <CtaRoute to="/gps-de-la-abundancia">Conocer GPS de la Abundancia®</CtaRoute>
        </Reveal>
      </Section>

      {/* ═══ PREGUNTAS FRECUENTES ═══════════════════════════════ */}
      <Section background="silk" width="960px">
        <Reveal className="mb-14">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <SectionTitle>Respuestas <em>claras</em>.</SectionTitle>
        </Reveal>

        <Reveal delay={120}>
          <Faq items={faqs} />
        </Reveal>
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
              Empecemos por <em>conversar</em>.
            </SectionTitle>

            <p className="mt-8 text-lg leading-[1.75] text-sand/70 max-w-[52ch] mx-auto">
              30 minutos, sin costo ni compromiso, para entender dónde estás
              y si la mentoría es adecuada para ti.
            </p>

            <div className="mt-11 flex justify-center">
              <CtaRoute to="/sesion-de-claridad" onDark>Agendar sesión de claridad</CtaRoute>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
