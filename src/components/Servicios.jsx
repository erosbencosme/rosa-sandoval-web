import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { GOOGLE_FORM_URL } from '../constants';

/* ================================================================
   Iconos SVG custom — trazos finos, geometría editorial
   ================================================================ */
const MentorIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="20" cy="14" r="5" />
        <path d="M9 32c0-6 5-10 11-10s11 4 11 10" />
        <path d="M4 20 L8 20" opacity="0.5" />
        <path d="M32 20 L36 20" opacity="0.5" />
    </svg>
);

const GroupIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="13" cy="15" r="3.5" />
        <circle cx="27" cy="15" r="3.5" />
        <circle cx="20" cy="23" r="3.5" />
        <path d="M6 32c0-3.5 3-6 7-6" />
        <path d="M34 32c0-3.5-3-6-7-6" />
        <path d="M13 34c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
);

const BookOpenIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 10c4-2 10-2 14 1v22c-4-3-10-3-14-1V10z" />
        <path d="M34 10c-4-2-10-2-14 1v22c4-3 10-3 14-1V10z" />
        <path d="M20 11v22" opacity="0.6" />
    </svg>
);

/* ================================================================
   Datos de servicios
   ================================================================ */
const services = [
    {
        Icon: MentorIcon,
        eyebrow: 'I · Individual',
        title: 'Mentoría Individual',
        description:
            'Sesiones personalizadas 1:1 para transformar tu relación con el dinero. Un espacio íntimo para reordenar creencias y trazar un plan a tu medida.',
        features: [
            'Plan personalizado según tus objetivos',
            'Material de trabajo exclusivo',
            'Seguimiento por WhatsApp 24/7',
            '4 sesiones mensuales de 60 min',
        ],
    },
    {
        Icon: GroupIcon,
        eyebrow: 'II · Colectivo',
        title: 'Talleres Grupales',
        description:
            'Crecimiento colectivo con apoyo de comunidad y accountability compartido. El poder del círculo cuando cada voz suma al mapa común.',
        features: [
            'Dinámicas grupales interactivas',
            'Comunidad de apoyo permanente',
            '8 sesiones grupales + 2 individuales',
            'Acceso a grabaciones por 6 meses',
        ],
    },
    {
        Icon: BookOpenIcon,
        eyebrow: 'III · A tu ritmo',
        title: 'Cursos Online',
        description:
            'Aprende a tu ritmo con contenido grabado y ejercicios prácticos. La metodología completa en tu bolsillo, para consultar cuantas veces necesites.',
        features: [
            '12 módulos grabados en video',
            'Ejercicios prácticos diarios',
            'Acceso de por vida al contenido',
            'Certificado digital al finalizar',
        ],
    },
];

/* ================================================================
   IconFrame — marco circular con doble borde gilt y glow warm
   ================================================================ */
function IconFrame({ Icon }) {
    return (
        <div className="relative w-24 h-24 mx-auto">
            {/* Aureola difusa gilt — sólo en hover del padre */}
            <div
                aria-hidden="true"
                className="absolute inset-[-16px] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background:
                        'radial-gradient(circle, rgba(201, 162, 39, 0.28), transparent 65%)',
                }}
            />
            {/* Anillo exterior gilt */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border transition-all duration-700 ease-out group-hover:scale-[1.08]"
                style={{ borderColor: 'var(--color-gilt)', opacity: 0.6 }}
            />
            {/* Segundo anillo — aparece en hover, más grande */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border scale-100 opacity-0 group-hover:opacity-60 group-hover:scale-[1.22] transition-all duration-700 ease-out"
                style={{ borderColor: 'var(--color-gilt)' }}
            />
            {/* Superficie interna warm */}
            <div
                aria-hidden="true"
                className="absolute inset-[10px] rounded-full transition-all duration-700 ease-out group-hover:inset-[14px]"
                style={{
                    background:
                        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), color-mix(in srgb, var(--color-beige) 25%, white))',
                    boxShadow: 'inset 0 2px 8px rgba(28, 45, 31, 0.05)',
                }}
            />
            {/* El icono */}
            <div className="relative w-full h-full flex items-center justify-center text-olive-dark transition-transform duration-700 ease-out group-hover:scale-110">
                <div className="w-11 h-11">
                    <Icon />
                </div>
            </div>
        </div>
    );
}

/* ================================================================
   Servicios — Premium Showcase Cards
   ================================================================ */
export default function Servicios() {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.12 });

    return (
        <section
            id="servicios"
            ref={sectionRef}
            className="py-32 md:py-44 relative overflow-hidden"
            style={{ background: 'var(--color-sand)' }}
        >
            <div className="max-w-[1400px] mx-auto px-[6%]">

                {/* Header editorial */}
                <header
                    className={`max-w-3xl mx-auto text-center mb-24 md:mb-28 transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive-dark/55 mb-8 flex items-center justify-center gap-4">
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                        Servicios
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                    </div>

                    <h2 className="font-display font-light text-olive-dark text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight m-0">
                        Tres caminos, un solo{' '}
                        <em className="italic font-normal text-olive">destino</em>.
                    </h2>

                    <p className="mt-8 text-lg text-olive-dark/75 leading-[1.75] max-w-[52ch] mx-auto">
                        Elige el formato que mejor se acomode a tu ritmo. Todos comparten
                        la misma brújula: reorientar tu relación con el dinero desde el ser.
                    </p>
                </header>

                {/* Grid de cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 max-w-[1200px] mx-auto">
                    {services.map((service, i) => (
                        <article
                            key={service.title}
                            className={`group relative rounded-lg p-10 md:p-11
                border transition-all duration-700 ease-out
                hover:-translate-y-2
                hover:shadow-[0_38px_70px_-30px_rgba(28,45,31,0.32)]
                overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{
                                background: 'var(--color-silk)',
                                borderColor: 'rgba(28, 45, 31, 0.08)',
                                transitionDelay: `${150 + i * 140}ms`,
                            }}
                        >
                            {/* Hairline gilt superior — animada en hover */}
                            <div
                                aria-hidden="true"
                                className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--color-gilt), transparent)',
                                }}
                            />

                            {/* Eyebrow numérico */}
                            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/50 text-center mb-8">
                                {service.eyebrow}
                            </div>

                            {/* Icono en marco */}
                            <IconFrame Icon={service.Icon} />

                            {/* Título */}
                            <h3 className="mt-8 font-display font-light text-olive-dark text-[1.7rem] leading-[1.1] text-center m-0">
                                {service.title}
                            </h3>

                            {/* Hairline gilt bajo el título */}
                            <div
                                aria-hidden="true"
                                className="mx-auto mt-5 mb-6 h-px w-8 transition-all duration-500 group-hover:w-20"
                                style={{ background: 'var(--color-gilt)', opacity: 0.75 }}
                            />

                            {/* Descripción */}
                            <p className="text-olive-dark/75 text-[0.98rem] leading-[1.75] text-center m-0 max-w-[32ch] mx-auto">
                                {service.description}
                            </p>

                            {/* Reveal editorial — features
                  · mobile: siempre visible bajo la descripción
                  · desktop: aparece en hover */}
                            <div
                                className="mt-8 md:mt-6
                  md:max-h-0 md:opacity-0 md:overflow-hidden
                  md:group-hover:max-h-64 md:group-hover:opacity-100
                  md:transition-all md:duration-700 md:ease-out"
                            >
                                <div className="pt-6 border-t" style={{ borderColor: 'rgba(28, 45, 31, 0.10)' }}>
                                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-olive-dark/45 mb-4 text-center">
                                        · Incluye
                                    </div>
                                    <ul className="space-y-2.5 list-none m-0 p-0">
                                        {service.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-start gap-3 text-[0.88rem] text-olive-dark/80 leading-relaxed"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="mt-[10px] block w-3 h-px flex-shrink-0"
                                                    style={{ background: 'var(--color-gilt)' }}
                                                />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA sutil — siempre visible */}
                            <div className="mt-8 text-center">
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-ui text-[0.72rem] uppercase tracking-[0.18em] text-olive-dark/70
                    border-b pb-1 no-underline
                    transition-colors duration-500
                    hover:text-olive-dark"
                                    style={{ borderColor: 'rgba(46, 59, 50, 0.25)' }}
                                >
                                    Solicitar información
                                    <span
                                        aria-hidden="true"
                                        className="inline-block w-1.5 h-1.5 rounded-full transition-transform duration-500"
                                        style={{ background: 'var(--color-gilt)' }}
                                    />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
