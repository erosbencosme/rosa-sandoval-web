import { MessageCircle } from 'lucide-react';

// ⚠️ REEMPLAZA con el número de WhatsApp real
const WHATSAPP_NUMBER = '18494720939';
const WHATSAPP_MESSAGE = encodeURIComponent(
    '¡Hola Rosa! Me interesa conocer más sobre tus servicios de coaching financiero. 🌟'
);

export default function WhatsAppButton() {
    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9998] w-16 h-16 rounded-full
        bg-[#25D366] flex items-center justify-center
        shadow-[0_6px_30px_rgba(37,211,102,0.5)]
        transition-all duration-300 hover:scale-110
        hover:shadow-[0_10px_40px_rgba(37,211,102,0.6)]
        animate-bounce-subtle group"
            aria-label="Escríbenos por WhatsApp"
            onClick={() => {
                if (typeof gtag === 'function') {
                    gtag('event', 'whatsapp_click', { event_category: 'engagement' });
                }
            }}
        >
            <MessageCircle size={28} className="text-white" />

            {/* Tooltip */}
            <span className="absolute right-20 bg-white text-olive text-sm font-semibold
        px-4 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)]
        whitespace-nowrap opacity-0 group-hover:opacity-100
        transition-opacity duration-300 pointer-events-none">
                ¿Necesitas ayuda?
            </span>

            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </a>
    );
}
