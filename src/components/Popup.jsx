import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { navigate } from '../router';
import { Hairline } from './ui';

// ================================================================
// Popup.jsx — Invitación de intención de salida
// ================================================================
//
// ⚠️ CAMBIO IMPORTANTE respecto a la versión anterior:
//
// El popup anterior pedía el email prometiendo "descarga GRATIS la
// guía 7 Pasos…" y mostraba "te hemos enviado la guía a tu correo".
// Esa guía no existe y el email no se enviaba a ningún servidor: se
// quedaba en el estado de React y se perdía al cerrar la pestaña.
// Era una promesa falsa al visitante y una fuga de leads.
//
// Ahora el popup ofrece lo único que sí existe y ya está montado:
// la Sesión de Claridad de 30 minutos, sin costo. Sin campo de email
// → no hay datos que se pierdan ni promesa que incumplir.
//
// Si en el futuro se produce la guía en PDF, el camino correcto es
// conectar el email a Formspree (como hace ContactForm) y alojar el
// PDF en public/. No volver a mostrar confirmación sin envío real.
//
// Disparadores:
//   · Escritorio → el cursor sale por el borde superior (exit intent)
//   · Móvil      → tras 45 s en la página (no existe 'mouseout')
// Se muestra UNA sola vez por navegador (localStorage).
// ================================================================

const STORAGE_KEY = 'rsp_exitInviteShown';
const MOBILE_DELAY_MS = 45000;

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    // localStorage puede lanzar en modo privado o con cookies bloqueadas
    let alreadyShown = false;
    try {
      alreadyShown = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    const markShown = () => {
      try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* sin persistencia */ }
    };

    const show = () => {
      setIsVisible(true);
      markShown();
    };

    // Exit intent — el cursor abandona el viewport por arriba
    const handleMouseOut = (e) => {
      if (e.clientY <= 0) {
        show();
        window.removeEventListener('mouseout', handleMouseOut);
      }
    };

    // Móvil — sin evento de salida, usamos tiempo en página
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) show();
    }, MOBILE_DELAY_MS);

    window.addEventListener('mouseout', handleMouseOut);
    return () => {
      window.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(mobileTimer);
    };
  }, []);

  // Accesibilidad del diálogo: bloquear scroll, cerrar con Escape,
  // mover el foco al abrir y devolverlo al cerrar.
  useEffect(() => {
    if (!isVisible) return;

    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const close = () => setIsVisible(false);

  const goToSession = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'exit_popup_cta', { event_category: 'lead' });
    }
    setIsVisible(false);
    navigate('/sesion-de-claridad');
  };

  return (
    <div
      className="fixed inset-0 bg-rich/70 backdrop-blur-sm z-[10000]
        flex items-center justify-center p-4 animate-fadeIn"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[520px] p-9 md:p-11 rounded-lg animate-fadeInUp
          shadow-[0_40px_90px_-30px_rgba(28,45,31,0.55)]"
        style={{ background: 'var(--color-sand)' }}
      >
        {/* Hairline gilt superior */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px rounded-t-lg"
          style={{ background: 'var(--color-gilt)', opacity: 0.7 }}
        />

        <button
          ref={closeButtonRef}
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer
            w-10 h-10 rounded-full flex items-center justify-center text-olive-dark/50
            transition-all duration-300 hover:bg-olive-dark/5 hover:text-olive-dark
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt"
        >
          <X size={19} aria-hidden="true" />
        </button>

        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/55 mb-6">
          Antes de irte
        </div>

        <h2
          id="exit-popup-title"
          className="font-display font-light text-olive-dark text-[clamp(1.6rem,3.5vw,2.15rem)]
            leading-[1.15] tracking-tight m-0"
        >
          ¿Conversamos <em className="italic font-normal text-olive">30 minutos</em>?
        </h2>

        <Hairline className="mt-6 mb-6" />

        <p className="text-[1.02rem] leading-[1.75] text-olive-dark/75 m-0">
          La Sesión de Claridad es una conversación sin costo para mirar dónde
          estás hoy con tu dinero, qué te preocupa y qué quieres lograr.
          Sin compromiso ni presión de compra.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4 sm:items-center">
          <button type="button" onClick={goToSession} className="btn-luxury w-full sm:w-auto">
            <span>Quiero mi sesión</span>
            <span className="btn-luxury-dot" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={close}
            className="bg-transparent border-0 cursor-pointer font-ui text-[0.82rem]
              text-olive-dark/55 underline underline-offset-4 py-2
              transition-colors duration-300 hover:text-olive-dark
              focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt rounded"
          >
            Seguir explorando
          </button>
        </div>
      </div>
    </div>
  );
}
