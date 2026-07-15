import { Heart, Zap, Trophy } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const pilares = [
    {
        icon: Heart,
        title: 'SER',
        subtitle: 'Mentalidad Financiera',
        description: 'Transforma tus creencias limitantes sobre el dinero. Sana tu relación emocional con las finanzas y construye una base sólida desde tu interior.',
        color: 'from-beige to-olive',
    },
    {
        icon: Zap,
        title: 'HACER',
        subtitle: 'Acciones Estratégicas',
        description: 'Aprende las herramientas y estrategias prácticas para gestionar tu dinero. Presupuestos, inversiones y planificación financiera efectiva.',
        color: 'from-olive to-olive-dark',
    },
    {
        icon: Trophy,
        title: 'TENER',
        subtitle: 'Resultados Tangibles',
        description: 'Alcanza la libertad financiera que mereces. Multiplica tus ingresos, elimina deudas y construye el patrimonio que siempre soñaste.',
        color: 'from-olive-dark to-beige',
    },
];

export default function Pilares() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section id="pilares" className="py-[120px] bg-white" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto px-[6%] text-center">

                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="text-[0.85rem] font-semibold text-olive tracking-[2px] uppercase mb-4 block">
                        Metodología
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black text-olive mb-6 leading-tight">
                        Del Ser al Tener
                    </h2>
                    <p className="text-lg text-gray-text max-w-[600px] mx-auto mb-20 leading-relaxed">
                        Mi metodología integral te guía a través de tres pilares fundamentales
                        para lograr tu transformación financiera completa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pilares.map((pilar, index) => {
                        const Icon = pilar.icon;
                        return (
                            <div
                                key={pilar.title}
                                className={`group bg-white rounded-3xl p-10 border border-gray-100
                  transition-all duration-500 hover:-translate-y-3
                  hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)]
                  relative overflow-hidden
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                            >
                                {/* Top gradient line */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pilar.color}
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`} />

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pilar.color}
                  flex items-center justify-center text-white mb-6 mx-auto
                  shadow-[0_8px_25px_rgba(77,90,78,0.3)]
                  transition-all duration-400 group-hover:scale-110 group-hover:rotate-[5deg]`}>
                                    <Icon size={28} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black text-olive mb-2 tracking-wider">
                                    {pilar.title}
                                </h3>
                                <p className="text-sm font-semibold text-beige mb-4 uppercase tracking-wide">
                                    {pilar.subtitle}
                                </p>
                                <p className="text-gray-text leading-relaxed text-[0.95rem]">
                                    {pilar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
