import { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const faqs = [
    {
        question: '¿Cómo funciona la mentoría individual?',
        answer:
            'Sesiones personalizadas de 60 minutos semanales + seguimiento por WhatsApp ilimitado. Diseñamos un plan específico adaptado a tus objetivos financieros y trabajamos juntas cada semana para alcanzar tus metas.',
    },
    {
        question: '¿Necesito conocimientos previos de finanzas?',
        answer:
            'No es necesario ningún conocimiento previo. Mi metodología Ser · Hacer · Tener parte desde los fundamentos emocionales hasta las estrategias prácticas. Está diseñada para mujeres en cualquier nivel de experiencia financiera.',
    },
    {
        question: '¿Cuánto tiempo tarda en verse resultados?',
        answer:
            'La mayoría de mis clientas reportan cambios significativos en las primeras 4–6 semanas. Los resultados varían según el compromiso, pero el 90% ve mejoras concretas en sus finanzas dentro de los primeros 3 meses.',
    },
    {
        question: '¿Qué incluye la sesión de claridad gratuita?',
        answer:
            'Es una llamada de 30 minutos donde evaluamos tu situación financiera actual, identificamos tus principales retos y definimos un plan de acción inicial. Sin compromiso ni presión de compra.',
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

    const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

    return (
        <section
            id="preguntas"
            ref={sectionRef}
            className="py-32 md:py-44 relative overflow-hidden"
            style={{ background: 'var(--color-silk)' }}
        >
            {/* Glow gilt sutil */}
            <div
                aria-hidden="true"
                className="absolute -top-32 right-[10%] w-[420px] h-[420px] rounded-full blur-[100px] opacity-[0.10]"
                style={{
                    background:
                        'radial-gradient(circle, var(--color-gilt), transparent 65%)',
                }}
            />

            <div className="relative max-w-[960px] mx-auto px-[6%]">

                {/* Header */}
                <header
                    className={`mb-16 md:mb-20 transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive-dark/55 mb-8 flex items-center gap-4">
                        <span aria-hidden="true" className="block w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                        Preguntas frecuentes
                    </div>
                    <h2 className="font-display font-light text-olive-dark text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight m-0">
                        Respuestas{' '}
                        <em className="italic font-normal text-olive">claras</em>.
                    </h2>
                </header>

                {/* Acordeones */}
                <div className="relative">

                    {/* Hairline gilt superior */}
                    <div
                        aria-hidden="true"
                        className="h-px w-full"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, var(--color-gilt), transparent)',
                            opacity: 0.85,
                        }}
                    />

                    {faqs.map((faq, i) => {
                        const open = activeIndex === i;
                        const panelId = `faq-panel-${i}`;
                        const buttonId = `faq-button-${i}`;

                        return (
                            <div
                                key={i}
                                className={`transition-all duration-500 ease-out
                  ${open ? 'bg-sand/70' : 'bg-transparent hover:bg-sand/40'}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                                style={{ transitionDelay: `${180 + i * 90}ms` }}
                            >
                                {/* Header del acordeón */}
                                <h3 className="m-0">
                                    <button
                                        id={buttonId}
                                        onClick={() => toggle(i)}
                                        aria-expanded={open}
                                        aria-controls={panelId}
                                        className="w-full py-7 md:py-8 px-4 md:px-8
                      flex justify-between items-center gap-6
                      text-left cursor-pointer bg-transparent border-0
                      transition-all duration-500 ease-out"
                                    >
                                        <span
                                            className={`font-display font-light m-0
                        text-[1.2rem] md:text-[1.45rem] leading-[1.35]
                        transition-colors duration-500 ease-out
                        ${open ? 'text-olive-dark' : 'text-olive-dark/80'}`}
                                        >
                                            {faq.question}
                                        </span>

                                        {/* Icono + → × (rotación 45°) */}
                                        <span
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-10 h-10 rounded-full border
                        flex items-center justify-center
                        transition-all duration-500 ease-out"
                                            style={{
                                                borderColor: open
                                                    ? 'var(--color-gilt)'
                                                    : 'rgba(46, 59, 50, 0.22)',
                                                background: open
                                                    ? 'color-mix(in srgb, var(--color-gilt) 8%, transparent)'
                                                    : 'transparent',
                                            }}
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                className={`transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]
                          ${open ? 'rotate-[135deg]' : 'rotate-0'}`}
                                                style={{
                                                    color: open ? 'var(--color-gilt)' : 'var(--color-olive-dark)',
                                                }}
                                            >
                                                <line x1="7" y1="1.5" x2="7" y2="12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                                <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </h3>

                                {/* Panel — max-height animation */}
                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    className={`overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="pb-8 px-4 md:px-8 max-w-[68ch]">
                                        <p className="text-olive-dark/80 text-[1.02rem] leading-[1.75] m-0 font-body">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>

                                {/* Hairline gilt separador */}
                                <div
                                    aria-hidden="true"
                                    className="h-px w-full"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.4), transparent)',
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Pie editorial */}
                <div className="mt-14 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/40">
                    <span aria-hidden="true" className="w-6 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />
                    ¿Más preguntas? Escríbenos.
                    <span aria-hidden="true" className="w-6 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />
                </div>
            </div>
        </section>
    );
}
