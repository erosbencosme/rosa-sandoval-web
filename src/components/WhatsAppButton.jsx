import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';

// ================================================================
// WhatsAppButton.jsx — Botón flotante de contacto directo
// ================================================================
//
// El número y el mensaje vienen de constants.js — antes estaban
// duplicados aquí, así que cambiar el número obligaba a editar dos
// archivos y era fácil dejar uno desactualizado.
//
// Aparece en todas las páginas, incluida la landing de Sesión de
// Claridad: es un canal de contacto, no navegación.
//
// El anillo pulsante se retrasa unos segundos para no competir con
// la entrada del hero. Se detiene tras la primera interacción del
// usuario con la página para no distraer indefinidamente.
// ================================================================

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppButton() {
  const [ready, setReady] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  // Entrada retrasada: el botón no compite con la animación del hero
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Dejar de pulsar en cuanto el usuario empieza a interactuar
  useEffect(() => {
    if (!pulsing) return;
    const stop = () => setPulsing(false);
    window.addEventListener('scroll', stop, { once: true, passive: true });
    window.addEventListener('pointerdown', stop, { once: true });
    return () => {
      window.removeEventListener('scroll', stop);
      window.removeEventListener('pointerdown', stop);
    };
  }, [pulsing]);

  const handleClick = () => {
    // La analítica es opcional: si GA4 o el Pixel no están instalados,
    // estas guardas evitan cualquier error en consola.
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', { event_category: 'engagement' });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { content_name: 'whatsapp_float' });
    }
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Escribir a Rosa por WhatsApp"
      className={`group fixed bottom-6 right-6 z-[9998] w-14 h-14 md:w-16 md:h-16 rounded-full
        bg-[#25D366] flex items-center justify-center
        shadow-[0_6px_30px_rgba(37,211,102,0.45)]
        transition-all duration-500 ease-out
        hover:scale-110 hover:shadow-[0_10px_40px_rgba(37,211,102,0.6)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]
        ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <MessageCircle size={26} className="text-white relative z-10" aria-hidden="true" />

      {/* Tooltip — oculto en móvil, donde no hay hover y el espacio es escaso */}
      <span
        aria-hidden="true"
        className="hidden md:block absolute right-[4.5rem] bg-cream text-olive-dark text-sm
          font-ui font-medium px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(28,45,31,0.18)]
          whitespace-nowrap opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300 pointer-events-none"
      >
        ¿Conversamos?
      </span>

      {/* Anillo pulsante — se apaga tras la primera interacción */}
      {pulsing && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"
        />
      )}
    </a>
  );
}
