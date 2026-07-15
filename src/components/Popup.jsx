import { useState, useEffect } from 'react';
import { X, Download, Gift } from 'lucide-react';

export default function Popup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Check if already shown
        if (localStorage.getItem('exitPopupShown')) return;

        const handleMouseLeave = (e) => {
            if (e.clientY <= 0) {
                setIsVisible(true);
                localStorage.setItem('exitPopupShown', 'true');
                window.removeEventListener('mouseout', handleMouseLeave);
            }
        };

        // Also show after 45 seconds on mobile (no mouseout event)
        const mobileTimer = setTimeout(() => {
            if (window.innerWidth < 768 && !localStorage.getItem('exitPopupShown')) {
                setIsVisible(true);
                localStorage.setItem('exitPopupShown', 'true');
            }
        }, 45000);

        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mouseout', handleMouseLeave);
            clearTimeout(mobileTimer);
        };
    }, []);

    const close = () => setIsVisible(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

        // Track conversion
        if (typeof gtag === 'function') {
            gtag('event', 'lead_magnet', { event_category: 'lead', event_label: 'exit_popup' });
        }
        if (typeof fbq === 'function') {
            fbq('track', 'Lead', { content_name: 'exit_popup_guide' });
        }

        setSubmitted(true);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]
        flex items-center justify-center p-4 animate-fadeIn"
            onClick={close}
        >
            <div
                className="bg-white max-w-[500px] w-full rounded-3xl p-10 relative
          shadow-[0_30px_80px_rgba(0,0,0,0.3)] animate-fadeInUp"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={close}
                    className="absolute top-4 right-4 bg-transparent border-none
            text-gray-muted cursor-pointer w-10 h-10 rounded-full
            flex items-center justify-center transition-all duration-200
            hover:bg-gray-100 hover:text-olive hover:rotate-90"
                    aria-label="Cerrar"
                >
                    <X size={20} />
                </button>

                {!submitted ? (
                    <>
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-beige to-olive
              flex items-center justify-center mx-auto mb-6
              shadow-[0_8px_25px_rgba(77,90,78,0.3)]">
                            <Gift size={28} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-black text-olive text-center mb-3">
                            ¡Espera! Tenemos un regalo
                        </h3>
                        <p className="text-gray-text text-center mb-8 leading-relaxed">
                            Descarga <strong className="text-olive">GRATIS</strong> nuestra guía
                            &quot;7 Pasos para Transformar tu Relación con el Dinero&quot;
                            y comienza tu transformación hoy.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Tu mejor email"
                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200
                  text-olive font-medium text-base transition-all duration-300
                  focus:outline-none focus:border-olive focus:shadow-[0_0_0_4px_rgba(77,90,78,0.2)]"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-olive text-white py-4 px-8 rounded-xl
                  font-bold text-base flex items-center justify-center gap-3
                  transition-all duration-300 border-none cursor-pointer
                  shadow-[0_10px_30px_rgba(77,90,78,0.3)]
                  hover:bg-olive-dark hover:-translate-y-0.5
                  hover:shadow-[0_20px_40px_rgba(77,90,78,0.4)]"
                            >
                                <Download size={18} />
                                Descargar guía GRATIS
                            </button>
                        </form>

                        <p className="text-xs text-gray-muted text-center mt-4">
                            Sin spam. Solo contenido de valor para tu transformación financiera.
                        </p>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-green-100
              flex items-center justify-center mx-auto mb-6">
                            <Download size={28} className="text-green-600" />
                        </div>
                        <h3 className="text-2xl font-black text-olive mb-3">
                            ¡Listo! Revisa tu email
                        </h3>
                        <p className="text-gray-text leading-relaxed">
                            Te hemos enviado la guía a <strong className="text-olive">{email}</strong>.
                            Revisa tu bandeja de entrada (y spam por si acaso).
                        </p>
                        <button
                            onClick={close}
                            className="mt-6 text-olive font-semibold underline cursor-pointer
                bg-transparent border-none text-base hover:text-olive-dark"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
