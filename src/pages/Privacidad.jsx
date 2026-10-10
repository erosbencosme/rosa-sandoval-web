import { CONTACT_EMAIL, BRAND, LOCATION } from '../constants';
import { Section, Eyebrow, Reveal, Hairline, Prose } from '../components/ui';

// ================================================================
// Privacidad.jsx — Política de privacidad
// ================================================================
//
// El documento de arquitectura la marca como NECESARIA, no opcional:
// "necesario porque el sitio recolecta datos personales a través de
//  los formularios de 'Agendar sesión' y 'Solicitar propuesta'".
//
// ⚠️ AVISO PARA EROS Y ROSA:
//    Este texto describe fielmente lo que el sitio hace HOY
//    (Formspree como procesador, sin base de datos propia, sin
//    analítica activa). Es un punto de partida honesto y suficiente
//    para el lanzamiento, pero NO es asesoría legal.
//
//    Debe revisarse con un abogado si:
//      · Se activa Google Analytics o el Pixel de Facebook
//        (entonces hay cookies de terceros que declarar)
//      · Se conecta una lista de correo
//      · Se reciben datos de personas en la Unión Europea (RGPD)
//
//    Al activar analítica, actualizar la sección "Cookies".
// ================================================================

export default function Privacidad() {
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
              Política de <em className="italic font-normal text-olive">privacidad</em>
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
              Esta política explica qué datos personales recoge este sitio, con
              qué finalidad y durante cuánto tiempo se conservan. Al usar los
              formularios del sitio, aceptas lo descrito aquí.
            </p>

            <h3>Quién es responsable de tus datos</h3>
            <p>
              La responsable del tratamiento es <strong>{BRAND.name}</strong>,
              con actividad profesional en {LOCATION}. Puedes contactarla en{' '}
              <strong>{CONTACT_EMAIL}</strong> para cualquier asunto relacionado
              con tus datos.
            </p>

            <h3>Qué datos recogemos</h3>
            <p>
              Únicamente los que tú escribes en los formularios de contacto:
            </p>
            <ul>
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Teléfono</li>
              <li>Empresa y cargo, cuando la solicitud es corporativa</li>
              <li>El mensaje que decidas escribir</li>
            </ul>
            <p>
              No pedimos ni almacenamos datos financieros, números de cuenta,
              documentos de identidad ni contraseñas. Si envías ese tipo de
              información dentro del campo de mensaje, se eliminará.
            </p>

            <h3>Para qué los usamos</h3>
            <p>
              Exclusivamente para responder a tu solicitud: coordinar una sesión,
              preparar una propuesta o contestar una consulta. No se usan para
              publicidad ni se incorporan a listas de correo sin tu autorización
              expresa.
            </p>

            <h3>Con quién se comparten</h3>
            <p>
              Los formularios se procesan a través de <strong>Formspree</strong>,
              un servicio que se encarga de entregar los mensajes al correo de
              Rosa. Es el único tercero que interviene, y actúa como procesador
              de datos por encargo. Tus datos no se venden ni se ceden a nadie
              más con fines comerciales.
            </p>
            <p>
              Si eliges agendar a través del formulario de Google, ese envío se
              rige adicionalmente por las políticas de privacidad de Google.
            </p>

            <h3>Cuánto tiempo se conservan</h3>
            <p>
              Los mensajes se conservan mientras exista una relación o
              conversación activa, y se eliminan cuando dejan de ser necesarios
              para la finalidad que los originó. Puedes pedir su eliminación en
              cualquier momento.
            </p>

            <h3>Tus derechos</h3>
            <p>
              Puedes solicitar en cualquier momento acceder a los datos que
              tenemos sobre ti, corregirlos si están equivocados, o pedir que se
              eliminen. Basta con escribir a <strong>{CONTACT_EMAIL}</strong>{' '}
              desde la dirección con la que nos contactaste. Responderemos dentro
              de un plazo razonable.
            </p>

            <h3>Cookies</h3>
            <p>
              Este sitio <strong>no utiliza cookies de seguimiento ni de
              publicidad</strong>. Se emplea únicamente el almacenamiento local
              del navegador para recordar si ya viste el aviso de la sesión de
              claridad, de modo que no se te muestre repetidamente. Ese dato no
              sale de tu navegador, no identifica a nadie y puedes borrarlo
              limpiando los datos del sitio.
            </p>

            <h3>Seguridad</h3>
            <p>
              Todos los envíos viajan cifrados mediante HTTPS. Aun así, ninguna
              transmisión por internet es completamente infalible, por lo que te
              pedimos no incluir información sensible en los mensajes.
            </p>

            <h3>Enlaces a otros sitios</h3>
            <p>
              El sitio enlaza a plataformas externas (YouTube, WhatsApp, Amazon,
              Google Forms). Una vez ahí, se aplican las políticas de privacidad
              de cada plataforma, sobre las que no tenemos control.
            </p>

            <h3>Cambios en esta política</h3>
            <p>
              Si cambia la forma en que tratamos los datos —por ejemplo, si en el
              futuro se activa una herramienta de analítica o una lista de
              correo— actualizaremos este documento y su fecha de revisión.
            </p>
          </Prose>
        </Reveal>
      </Section>
    </>
  );
}
