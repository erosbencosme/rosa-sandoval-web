import { CONTACT_EMAIL, BRAND, LEGAL } from '../constants';
import Link from '../components/Link';
import { Section, Eyebrow, Reveal, Hairline, Prose } from '../components/ui';

// ================================================================
// Terminos.jsx — Términos de uso
// ================================================================
//
// ⚠️ La sección más importante de este documento es "Naturaleza del
//    servicio". Rosa ofrece educación y acompañamiento financiero,
//    NO asesoría de inversión regulada. Dejarlo escrito protege a
//    Rosa y es coherente con lo que ella misma responde en el FAQ:
//    "la mentoría no promete resultados financieros automáticos ni
//    fórmulas mágicas".
//
//    Este texto es un punto de partida honesto, no asesoría legal.
//    Conviene que lo revise un abogado antes del lanzamiento.
// ================================================================

export default function Terminos() {
  const lastUpdate = 'agosto de 2026';

  return (
    <>
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        style={{ background: 'var(--color-sand)' }}
      >
        <div aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-[6%] w-px bg-olive-dark/10" />

        <div className="relative max-w-[1400px] mx-auto px-[6%]">
          <Reveal className="max-w-[44ch]">
            <Eyebrow>Legal</Eyebrow>

            <h1 className="font-display font-light text-olive-dark leading-[1.05] tracking-tight m-0
              text-[clamp(2.15rem,4.5vw,3.25rem)]">
              Términos de <em className="italic font-normal text-olive">uso</em>
            </h1>

            <Hairline className="my-8" width="w-16" />

            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-olive-dark/50 m-0">
              Última actualización: {lastUpdate}
            </p>
          </Reveal>
        </div>
      </section>

      <Section background="silk" width="900px">
        <Reveal>
          <Prose>
            <p>
              Al navegar y utilizar este sitio aceptas las condiciones descritas
              a continuación. Si no estás de acuerdo con ellas, te pedimos no
              utilizar el sitio ni sus formularios.
            </p>

            <h3>Naturaleza del servicio</h3>
            <p>
              El contenido de este sitio y los servicios de mentoría, talleres,
              conferencias y programas formativos tienen una finalidad{' '}
              <strong>educativa y de acompañamiento</strong>. Se orientan a
              ayudarte a comprender tu situación, revisar tus creencias y tomar
              decisiones más conscientes con tus recursos.
            </p>
            <p>
              <strong>No constituyen asesoría de inversión, asesoría fiscal,
              contable ni legal</strong>, ni recomendación de productos
              financieros concretos. No se gestionan fondos ni patrimonios de
              terceros. Para decisiones que requieran una opinión profesional
              regulada, consulta con un especialista habilitado.
            </p>

            <h3>Sobre los resultados</h3>
            <p>
              No se garantizan resultados financieros específicos. Los avances
              dependen de tu contexto, tu compromiso y factores que están fuera
              del alcance del acompañamiento. Los testimonios publicados
              describen experiencias individuales y no deben interpretarse como
              una promesa de resultados equivalentes.
            </p>

            <h3>Uso del contenido</h3>
            <p>
              Todos los textos, imágenes, materiales y metodologías de este sitio
              son propiedad de {BRAND.name}, salvo indicación en contrario.
              Puedes leerlos, citarlos con atribución y compartir sus enlaces.
            </p>
            <p>
              No está permitido reproducirlos íntegramente, comercializarlos ni
              utilizarlos para crear programas derivados sin autorización
              expresa y por escrito.
            </p>

            <h3>Marca registrada</h3>
            <p>
              {LEGAL.trademarkNotice} Su uso por parte de terceros requiere
              autorización previa.
            </p>

            <h3>Formularios y comunicaciones</h3>
            <p>
              Al enviar un formulario aceptas ser contactado en los datos que
              proporcionaste, con el único fin de responder a tu solicitud. El
              tratamiento de esos datos se describe en la{' '}
              <Link
                to="/privacidad"
                className="text-olive-dark underline underline-offset-4 decoration-1
                  transition-colors duration-300 hover:text-olive"
              >
                política de privacidad
              </Link>.
            </p>
            <p>
              Te pedimos no enviar información confidencial, datos financieros ni
              documentos de identidad a través de estos formularios.
            </p>

            <h3>Enlaces externos</h3>
            <p>
              El sitio enlaza a plataformas de terceros (YouTube, WhatsApp,
              Amazon, Google). No controlamos su contenido ni sus condiciones, y
              no respondemos por ellos.
            </p>

            <h3>Disponibilidad</h3>
            <p>
              Procuramos que el sitio esté siempre disponible y actualizado, pero
              puede haber interrupciones por mantenimiento o causas técnicas.
              El contenido puede modificarse sin aviso previo.
            </p>

            <h3>Contacto</h3>
            <p>
              Para cualquier consulta sobre estos términos, escribe a{' '}
              <strong>{CONTACT_EMAIL}</strong>.
            </p>
          </Prose>
        </Reveal>
      </Section>
    </>
  );
}
