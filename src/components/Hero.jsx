import { ArrowRight, Sparkles } from 'lucide-react';
import { GOOGLE_FORM_URL } from '../constants';

export default function Hero() {
    const scrollTo = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="pt-[120px] pb-20 min-h-screen flex items-center
        bg-gradient-to-br from-beige-light to-white overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-[6%] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

                    {/* Text Column */}
                    <div className="flex flex-col justify-center gap-6 text-center lg:text-left items-center lg:items-start animate-fadeInUp">

                        {/* Badge */}
                        <div className="bg-white text-olive px-4 py-2.5 rounded-full
              font-semibold text-sm tracking-wide shadow-[0_2px_20px_rgba(0,0,0,0.1)]
              w-fit animate-slideInLeft flex items-center gap-2">
                            <Sparkles size={16} className="text-beige" />
                            Coach Financiera Certificada
                        </div>

                        {/* Urgency Badge */}
                        <div className="bg-olive-dark text-white px-4 py-2 rounded-full
              text-xs font-bold tracking-wider animate-pulse-glow w-fit
              flex items-center gap-2">
                            🔥 Solo 5 sesiones de claridad GRATIS esta semana
                        </div>

                        {/* Main Title */}
                        <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.1]
              text-olive m-0">
                            La Conciencia Financiera que{' '}
                            <span className="text-olive-dark">Transformará tu Vida</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg leading-relaxed text-olive max-w-[450px]">
                            Del <strong className="text-olive-dark font-black">Ser</strong> al{' '}
                            <strong className="text-olive-dark font-black">Tener</strong>: Tu camino hacia
                            la <strong className="text-olive-dark font-black">libertad financiera</strong>.
                            Te acompaño a transformar tu relación con el dinero.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4 flex-wrap mt-4 justify-center lg:justify-start">
                            <a
                                href={GOOGLE_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-olive text-white px-8 py-3.5 rounded-md
                  font-semibold text-sm tracking-wide no-underline inline-flex items-center
                  gap-3 shadow-[0_8px_25px_rgba(77,90,78,0.25)]
                  transition-all duration-500 ease-out hover:-translate-y-0.5
                  hover:shadow-[0_15px_40px_rgba(77,90,78,0.35)]
                  hover:bg-olive-dark group"
                            >
                                Agenda tu sesión GRATIS
                                <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#servicios"
                                onClick={(e) => scrollTo(e, '#servicios')}
                                className="bg-white text-olive px-8 py-3.5 rounded-md
                  font-semibold text-sm tracking-wide no-underline inline-flex items-center
                  gap-3 border border-olive/15 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                  transition-all duration-500 ease-out hover:-translate-y-0.5
                  hover:bg-beige-light/50 hover:border-olive/30
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                            >
                                Ver servicios
                            </a>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="flex justify-center items-center animate-fadeInUp delay-200 order-first lg:order-last">
                        <div className="relative w-full max-w-[500px] aspect-[4/5]">
                            <img
                                src="https://rosasandoval.com/wp-content/uploads/2023/07/862A5298-Editar-1024x831.jpg"
                                alt="Rosa Sandoval Polanco — Coach Financiera"
                                className="w-full h-full object-cover rounded-[20px]
                  shadow-[0_30px_80px_rgba(0,0,0,0.3)] transition-all duration-500
                  hover:scale-[1.02] hover:-translate-y-2.5
                  hover:shadow-[0_40px_100px_rgba(0,0,0,0.35)]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
