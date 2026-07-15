import { Play, ShoppingCart, Clock } from 'lucide-react';
import useCountdown from '../hooks/useCountdown';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// ⚠️ PEGA AQUÍ TU LINK DE AMAZON AFFILIATE
// Ejemplo: 'https://www.amazon.com/dp/TU-PRODUCTO?tag=TU-TAG-20'
const AMAZON_LINK = 'https://www.amazon.com/-/es/ref=nav_logo';

// Fecha de la próxima formación (configurable)
const NEXT_COURSE_DATE = '2026-04-01T00:00:00';

export default function Cursos() {
    const timeLeft = useCountdown(NEXT_COURSE_DATE);
    const [sectionRef, isVisible] = useIntersectionObserver();

    const timeBlocks = [
        { value: timeLeft.days, label: 'Días' },
        { value: timeLeft.hours, label: 'Horas' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Seg' },
    ];

    return (
        <section id="cursos" className="py-[120px] bg-gray-soft" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto px-[6%]">
                <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="text-[0.85rem] font-semibold text-olive tracking-[2px] uppercase mb-4 block">
                        Formación
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-black text-olive mb-6 leading-tight">
                        Próxima formación
                    </h2>
                    <p className="text-lg text-gray-text max-w-[600px] mx-auto mb-16 leading-relaxed">
                        Transforma tu mentalidad financiera con nuestro programa integral.
                        Plazas limitadas para garantizar atención personalizada.
                    </p>
                </div>

                {/* Main Course Card */}
                <div className={`max-w-[900px] mx-auto bg-white rounded-3xl overflow-hidden
          shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    {/* Top gradient */}
                    <div className="h-2 bg-gradient-to-r from-beige via-olive to-olive-dark" />

                    <div className="p-10 md:p-14">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock size={20} className="text-olive" />
                            <span className="text-sm font-semibold text-olive uppercase tracking-wider">
                                Inscripciones abiertas
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-olive mb-4">
                            Programa de Conciencia Financiera
                        </h3>
                        <p className="text-gray-text text-lg leading-relaxed mb-10 max-w-[600px]">
                            12 semanas de transformación profunda. Aprende a gestionar tu dinero
                            desde el Ser, Hacer y Tener con mentoría directa de Rosa Sandoval.
                        </p>

                        {/* Countdown */}
                        <div className="mb-10">
                            <p className="text-sm font-semibold text-olive mb-4 uppercase tracking-wider">
                                La formación comienza en:
                            </p>
                            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                                {timeBlocks.map((block) => (
                                    <div key={block.label} className="bg-gradient-to-br from-olive to-olive-dark
                    text-white rounded-2xl p-4 min-w-[80px] text-center
                    shadow-[0_8px_25px_rgba(77,90,78,0.3)]">
                                        <span className="block text-3xl font-black leading-none mb-1">
                                            {String(block.value).padStart(2, '0')}
                                        </span>
                                        <span className="text-xs font-semibold opacity-80 uppercase tracking-wider">
                                            {block.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#contacto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.querySelector('#contacto');
                                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                                }}
                                className="bg-olive text-white px-8 py-3.5 rounded-xl font-semibold
                  text-sm no-underline inline-flex items-center gap-2
                  shadow-[0_8px_25px_rgba(77,90,78,0.3)] transition-all duration-300
                  hover:bg-olive-dark hover:-translate-y-0.5
                  hover:shadow-[0_15px_35px_rgba(77,90,78,0.4)]"
                            >
                                Reservar mi plaza
                            </a>

                            {/* Amazon Button */}
                            <a
                                href={AMAZON_LINK || '#'}
                                target={AMAZON_LINK ? '_blank' : undefined}
                                rel={AMAZON_LINK ? 'noopener noreferrer' : undefined}
                                onClick={(e) => {
                                    if (!AMAZON_LINK) e.preventDefault();
                                }}
                                className={`bg-[#FF9900] text-white px-8 py-3.5 rounded-xl font-semibold
                  text-sm no-underline inline-flex items-center gap-2
                  shadow-[0_8px_25px_rgba(255,153,0,0.3)] transition-all duration-300
                  ${AMAZON_LINK
                                        ? 'hover:bg-[#e68a00] hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(255,153,0,0.4)]'
                                        : 'opacity-80 cursor-not-allowed'
                                    }`}
                                title={AMAZON_LINK ? 'Comprar en Amazon' : 'Próximamente disponible'}
                            >
                                <ShoppingCart size={18} />
                                Comprar en Amazon
                                {!AMAZON_LINK && (
                                    <span className="text-[0.65rem] bg-white/20 px-2 py-0.5 rounded-full ml-1">
                                        Próximamente
                                    </span>
                                )}
                            </a>
                        </div>

                        {/* YouTube Link */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <a
                                href="https://www.youtube.com/@NuestroEspacioPodcast-h3w/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 text-olive font-semibold
                  text-sm no-underline transition-all duration-300
                  hover:text-olive-dark group"
                            >
                                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center
                  justify-center transition-transform duration-300 group-hover:scale-110">
                                    <Play size={18} className="text-white ml-0.5" />
                                </div>
                                Ver contenido gratuito en YouTube
                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
