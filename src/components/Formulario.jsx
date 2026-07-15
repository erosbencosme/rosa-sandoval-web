import { useState } from 'react';
import { Send, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { CONTACT_FORM_ENDPOINT } from '../constants';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// ================================================================
// Formulario.jsx — Formulario de contacto de PRODUCCIÓN
// ================================================================
//
// Endpoint:
//   Viene de CONTACT_FORM_ENDPOINT en constants.js.
//   Cambia esa sola constante para apuntar a Formspree, Web3Forms,
//   o cualquier otro servicio.
//
// Seguridad:
//   · HTTPS obligatorio (Formspree/Web3Forms solo aceptan HTTPS)
//   · preventDefault() evita que el navegador recargue la página
//   · Sanitización básica de inputs (trim + strip de HTML tags)
//   · Botón deshabilitado durante el envío (previene doble-submit)
//   · Validación client-side antes de hacer el POST
//   · No se envían datos sensibles en la URL (todo va en el body)
//
// Estados del formulario:
//   idle     → Formulario listo para llenar
//   sending  → POST en curso, botón deshabilitado + spinner
//   success  → Mensaje enviado, se muestra ThankYouCard
//   error    → Error del servidor o de red, se muestra banner
//
// 🔒 Row Level Security (RLS):
//   Si almacenas estos leads en Supabase, ver las instrucciones
//   de RLS en constants.js para proteger la tabla 'leads'.
// ================================================================

const initialValues = { nombre: '', email: '', telefono: '', mensaje: '' };

const benefits = [
    'Evaluación de tu situación financiera actual',
    'Identificación de creencias limitantes',
    'Plan de acción personalizado inicial',
    'Sin compromiso ni presión de compra',
];

/**
 * sanitize — Limpieza básica de inputs del usuario.
 *
 * Remueve tags HTML para prevenir XSS almacenado si el backend
 * no sanitiza (Formspree lo hace, pero es buena práctica defensiva).
 * También elimina espacios innecesarios al inicio/fin.
 *
 * @param {string} str — Input del usuario
 * @returns {string} — Input limpio
 */
function sanitize(str) {
    return str.replace(/<[^>]*>/g, '').trim();
}

export default function Formulario() {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    // ── Validación client-side ────────────────────────────────
    // Se ejecuta ANTES del POST. Si hay errores, se muestran
    // inline debajo de cada campo y NO se envía nada al servidor.
    const validate = () => {
        const next = {};
        if (!values.nombre.trim() || values.nombre.trim().length < 2) {
            next.nombre = 'Por favor ingresa tu nombre completo.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            next.email = 'Ingresa un email válido.';
        }
        if (!/^[\d+\s()-]{7,}$/.test(values.telefono)) {
            next.telefono = 'Ingresa un teléfono válido.';
        }
        if (!values.mensaje.trim() || values.mensaje.trim().length < 10) {
            next.mensaje = 'Cuéntame un poco más (mínimo 10 caracteres).';
        }
        return next;
    };

    // ── Handlers ──────────────────────────────────────────────

    /**
     * handleChange — Actualiza el estado del formulario en tiempo real.
     * Si un campo tenía error y el usuario lo corrige, el error
     * desaparece inmediatamente (UX responsive).
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        // Limpiar error del campo cuando el usuario empieza a corregir
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    /**
     * handleSubmit — Envío seguro del formulario.
     *
     * Flujo:
     *   1. preventDefault() → evita reload del navegador
     *   2. Validación client-side → muestra errores inline
     *   3. Cambia estado a 'sending' → desactiva botón (anti doble-submit)
     *   4. Sanitiza inputs → remueve HTML tags
     *   5. POST vía fetch → HTTPS obligatorio
     *   6. Manejo de respuesta → success o error
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 🔒 Evita que el navegador recargue la página

        // Paso 1: Validar antes de enviar
        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return; // No enviamos si hay errores
        }

        // Paso 2: Cambiar estado a "enviando" (desactiva el botón)
        setStatus('sending');
        setErrorMsg('');

        try {
            // Paso 3: Sanitizar inputs y enviar vía HTTPS
            const res = await fetch(CONTACT_FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    nombre: sanitize(values.nombre),
                    email: sanitize(values.email),
                    telefono: sanitize(values.telefono),
                    mensaje: sanitize(values.mensaje),
                    _subject: `Nueva sesión de claridad — ${sanitize(values.nombre)}`,
                    _replyto: sanitize(values.email),
                }),
            });

            // Paso 4: Evaluar la respuesta del servidor
            if (res.ok) {
                setStatus('success');
                setValues(initialValues);
                setErrors({});
                return;
            }

            // Si el servidor respondió con error, mostramos el mensaje
            const data = await res.json().catch(() => ({}));
            const message =
                (Array.isArray(data?.errors) && data.errors[0]?.message) ||
                'No pudimos enviar tu mensaje. Intenta de nuevo en un momento.';
            setErrorMsg(message);
            setStatus('error');
        } catch {
            // Error de red (sin conexión, timeout, etc.)
            setErrorMsg('Sin conexión. Verifica tu red e intenta de nuevo.');
            setStatus('error');
        }
    };

    /** resetForm — Vuelve al estado inicial para permitir otro envío */
    const resetForm = () => {
        setStatus('idle');
        setErrorMsg('');
        setErrors({});
    };

    // ── Estilos base compartidos ─────────────────────────────
    const inputClass = (hasError) =>
        `w-full px-5 py-4 text-olive-dark font-normal text-base leading-normal
     placeholder:italic placeholder:text-olive-dark/35
     border ${hasError ? 'border-red-400/70' : 'border-olive-dark/15'}
     focus:outline-none focus:border-olive-dark/50`;

    const labelClass =
        'block font-ui text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-olive-dark mb-2.5';

    return (
        <section
            id="contacto"
            ref={sectionRef}
            className="py-32 md:py-44 bg-white"
        >
            <div className="max-w-[1400px] mx-auto px-[6%]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16 items-start">

                    {/* ─── Columna informativa ─────────────────────────── */}
                    <aside
                        className={`lg:col-span-5 transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-olive-dark/55 mb-8 flex items-center gap-4">
                            <span
                                aria-hidden="true"
                                className="block w-10 h-px"
                                style={{ background: 'var(--color-gilt)' }}
                            />
                            Contacto
                        </div>

                        <h2 className="font-display font-light text-olive-dark text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight m-0">
                            Agenda tu{' '}
                            <em className="italic font-normal text-olive">sesión</em>{' '}
                            de claridad.
                        </h2>

                        <p className="mt-8 text-lg text-olive-dark/80 leading-[1.7] max-w-[46ch]">
                            Tu primera sesión es <strong className="text-olive-dark font-semibold">100% gratuita</strong>.
                            En 30 minutos evaluamos tu situación actual y diseñamos
                            un plan de acción personalizado. Sin compromisos.
                        </p>

                        <ul className="mt-10 space-y-4 list-none p-0 m-0">
                            {benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-4 text-olive-dark/85 text-[0.98rem] leading-relaxed">
                                    <span
                                        aria-hidden="true"
                                        className="mt-[13px] block w-4 h-px flex-shrink-0"
                                        style={{ background: 'var(--color-gilt)' }}
                                    />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-14 pt-8 border-t border-olive-dark/10">
                            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-olive-dark/55 mb-3">
                                Respuesta en 24 horas
                            </div>
                            <p className="font-body text-sm text-olive-dark/70 leading-relaxed max-w-[42ch]">
                                Solo 5 sesiones gratuitas disponibles cada semana.
                                Reserva tu espacio con calma — te escribimos personalmente.
                            </p>
                        </div>
                    </aside>

                    {/* ─── Columna del formulario / thank-you ──────────── */}
                    <div
                        className={`lg:col-span-7 transition-all duration-700 delay-200 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        {status === 'success' ? (
                            <ThankYouCard onReset={resetForm} />
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="relative bg-cream/60 p-10 md:p-14 border border-olive-dark/[0.08] rounded-lg"
                                noValidate
                            >
                                {/* Marca mono editorial */}
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-olive-dark/50 mb-8 flex items-center gap-3">
                                    <span aria-hidden="true" className="block w-8 h-px bg-olive-dark/30" />
                                    Completa el formulario
                                </div>

                                {/* Error banner elegante — solo visible cuando status === 'error' */}
                                {status === 'error' && (
                                    <div
                                        role="alert"
                                        className="mb-8 flex items-start gap-3 text-sm border border-red-300/60
                      bg-red-50/70 text-red-800 rounded-md px-5 py-4 animate-fadeIn"
                                    >
                                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                        <span className="leading-relaxed">{errorMsg}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombre */}
                                    <div>
                                        <label htmlFor="f-nombre" className={labelClass}>Nombre completo</label>
                                        <input
                                            id="f-nombre"
                                            type="text"
                                            name="nombre"
                                            value={values.nombre}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            autoComplete="name"
                                            className={inputClass(!!errors.nombre)}
                                            aria-invalid={!!errors.nombre}
                                            aria-describedby={errors.nombre ? 'f-nombre-error' : undefined}
                                        />
                                        {errors.nombre && (
                                            <p id="f-nombre-error" className="text-red-600 text-xs mt-2 flex items-center gap-1.5">
                                                <AlertCircle size={11} /> {errors.nombre}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="f-email" className={labelClass}>Email</label>
                                        <input
                                            id="f-email"
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="tu@email.com"
                                            autoComplete="email"
                                            className={inputClass(!!errors.email)}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? 'f-email-error' : undefined}
                                        />
                                        {errors.email && (
                                            <p id="f-email-error" className="text-red-600 text-xs mt-2 flex items-center gap-1.5">
                                                <AlertCircle size={11} /> {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Teléfono — span 2 */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="f-tel" className={labelClass}>Teléfono (WhatsApp)</label>
                                        <input
                                            id="f-tel"
                                            type="tel"
                                            name="telefono"
                                            value={values.telefono}
                                            onChange={handleChange}
                                            placeholder="+1 809 000 0000"
                                            autoComplete="tel"
                                            className={inputClass(!!errors.telefono)}
                                            aria-invalid={!!errors.telefono}
                                            aria-describedby={errors.telefono ? 'f-tel-error' : undefined}
                                        />
                                        {errors.telefono && (
                                            <p id="f-tel-error" className="text-red-600 text-xs mt-2 flex items-center gap-1.5">
                                                <AlertCircle size={11} /> {errors.telefono}
                                            </p>
                                        )}
                                    </div>

                                    {/* Mensaje — span 2 */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="f-msg" className={labelClass}>¿En qué puedo ayudarte?</label>
                                        <textarea
                                            id="f-msg"
                                            name="mensaje"
                                            value={values.mensaje}
                                            onChange={handleChange}
                                            placeholder="Cuéntame sobre tu situación financiera actual y tus objetivos…"
                                            rows={5}
                                            className={`${inputClass(!!errors.mensaje)} resize-none`}
                                            aria-invalid={!!errors.mensaje}
                                            aria-describedby={errors.mensaje ? 'f-msg-error' : undefined}
                                        />
                                        {errors.mensaje && (
                                            <p id="f-msg-error" className="text-red-600 text-xs mt-2 flex items-center gap-1.5">
                                                <AlertCircle size={11} /> {errors.mensaje}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit — deshabilitado durante el envío para prevenir doble-submit */}
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`mt-10 group w-full inline-flex items-center justify-center gap-3
                    bg-olive-dark text-cream px-8 py-4 rounded-md
                    font-ui text-sm font-medium tracking-[0.15em] uppercase
                    transition-all duration-500 ease-out border-0 cursor-pointer
                    hover:bg-olive hover:shadow-[0_15px_40px_-15px_rgba(46,59,50,0.5)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-dark
                    focus-visible:ring-offset-2 focus-visible:ring-offset-cream
                    disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-olive-dark disabled:hover:shadow-none`}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                                            <span className="tracking-[0.22em] animate-pulse">Enviando…</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send
                                                size={15}
                                                className="transition-transform duration-500 group-hover:translate-x-0.5"
                                                aria-hidden="true"
                                            />
                                            Agendar mi sesión
                                        </>
                                    )}
                                </button>

                                <p className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-olive-dark/40">
                                    Tus datos están protegidos · nunca compartimos tu información
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   ThankYouCard — Pantalla de agradecimiento editorial
   
   Se muestra después de un envío exitoso (status === 'success').
   El botón "Enviar otro mensaje" llama a onReset() que vuelve
   el formulario a estado 'idle'.
   ================================================================ */
function ThankYouCard({ onReset }) {
    return (
        <div className="relative bg-cream/60 p-12 md:p-16 border border-olive-dark/[0.08] rounded-lg text-center overflow-hidden animate-fadeInUp">
            {/* Sello superior */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full
        flex items-center justify-center bg-cream border border-olive-dark/[0.10]
        shadow-[0_8px_24px_-8px_rgba(46,59,50,0.15)]">
                <Sparkles size={22} aria-hidden="true" style={{ color: 'var(--color-gilt)' }} />
            </div>

            <div className="pt-10">
                {/* Eyebrow con guiones gilt */}
                <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-olive-dark/55 mb-8 flex items-center justify-center gap-4">
                    <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                    Mensaje recibido
                    <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)' }} />
                </div>

                {/* Título Fraunces italic */}
                <h3 className="font-display italic font-light text-olive-dark
          text-[clamp(1.65rem,3.2vw,2.5rem)] leading-[1.25]
          max-w-[26ch] mx-auto m-0">
                    Gracias por conectar, tu camino hacia la abundancia comienza aquí.
                </h3>

                <p className="mt-10 max-w-[44ch] mx-auto text-olive-dark/75 leading-[1.75] text-base md:text-lg">
                    Nos pondremos en contacto contigo en las próximas <strong className="font-semibold text-olive-dark">24 horas</strong> para agendar tu sesión de claridad.
                    Mientras tanto, respira profundo — este ya es el primer paso.
                </p>

                {/* Regla gilt de cierre */}
                <div className="mt-10 flex items-center justify-center gap-4">
                    <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.5 }} />
                    <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-olive-dark/40">
                        Rosa Sandoval
                    </span>
                    <span aria-hidden="true" className="w-10 h-px" style={{ background: 'var(--color-gilt)', opacity: 0.5 }} />
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    className="mt-10 inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em]
            text-olive-dark/60 border-b border-olive-dark/30 pb-1 bg-transparent cursor-pointer border-0 border-b
            transition-colors duration-500 hover:text-olive-dark"
                >
                    Enviar otro mensaje
                </button>
            </div>
        </div>
    );
}
