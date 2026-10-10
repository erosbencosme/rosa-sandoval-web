import { useState } from 'react';
import { Send, AlertCircle, Loader2, Check } from 'lucide-react';
import { CONTACT_FORM_ENDPOINT } from '../constants';
import { Hairline } from './ui';

// ================================================================
// ContactForm.jsx — Formulario de contacto reutilizable
// ================================================================
//
// Una sola implementación para las tres rutas de contacto que pide
// el documento de arquitectura:
//
//   variant="individual"  → mentoría / sesión de claridad
//   variant="empresa"     → solicitud de propuesta corporativa
//   variant="conferencia" → conferencias y eventos
//
// La variante cambia los campos y el asunto del correo que recibe
// Rosa, para que pueda distinguir de un vistazo de dónde viene cada
// solicitud sin abrir el mensaje.
//
// Seguridad:
//   · HTTPS obligatorio (Formspree solo acepta HTTPS)
//   · preventDefault() evita la recarga del navegador
//   · Sanitización básica (strip de tags HTML + trim)
//   · Botón deshabilitado durante el envío (previene doble submit)
//   · Validación en cliente antes del POST
//   · Honeypot anti-bots (campo oculto que un humano nunca llena)
//   · Nada sensible viaja en la URL: todo va en el body
// ================================================================

/* ── Definición de campos por variante ───────────────────────── */

const FIELD_LIBRARY = {
  nombre: { label: 'Nombre completo', type: 'text', autoComplete: 'name', required: true, placeholder: 'Tu nombre' },
  email: { label: 'Correo electrónico', type: 'email', autoComplete: 'email', required: true, placeholder: 'tucorreo@ejemplo.com' },
  telefono: { label: 'Teléfono', type: 'tel', autoComplete: 'tel', required: true, placeholder: '+1 809 000 0000' },
  empresa: { label: 'Empresa', type: 'text', autoComplete: 'organization', required: true, placeholder: 'Nombre de la organización' },
  cargo: { label: 'Cargo', type: 'text', autoComplete: 'organization-title', required: false, placeholder: 'Tu rol en la organización' },
  organizacion: { label: 'Organización o evento', type: 'text', autoComplete: 'organization', required: false, placeholder: 'Quién organiza' },
  mensaje: { label: 'Cuéntame', type: 'textarea', required: true, placeholder: 'Escribe aquí lo que necesitas…' },
};

const VARIANTS = {
  individual: {
    fields: ['nombre', 'email', 'telefono', 'mensaje'],
    subject: 'Nueva solicitud de mentoría',
    source: 'Mentoría / Sesión de claridad',
    submitLabel: 'Enviar solicitud',
    messageHint: '¿Qué te gustaría transformar en tu relación con el dinero?',
    successTitle: 'Mensaje recibido',
    successBody: 'Gracias por escribir. Rosa te responderá personalmente en las próximas 48 horas hábiles.',
  },
  empresa: {
    fields: ['nombre', 'cargo', 'empresa', 'email', 'telefono', 'mensaje'],
    subject: 'Solicitud de propuesta corporativa',
    source: 'Para Empresas',
    submitLabel: 'Solicitar propuesta',
    messageHint: '¿Qué necesita hoy tu organización? Cuéntanos tamaño del grupo, tema de interés y fechas tentativas.',
    successTitle: 'Solicitud recibida',
    successBody: 'Gracias. Rosa revisará la solicitud y te enviará una propuesta ajustada a tu organización.',
  },
  conferencia: {
    fields: ['nombre', 'organizacion', 'email', 'telefono', 'mensaje'],
    subject: 'Consulta de conferencia / evento',
    source: 'Conferencias y eventos',
    submitLabel: 'Enviar consulta',
    messageHint: 'Cuéntanos sobre el evento: fecha, lugar, audiencia y tema de interés.',
    successTitle: 'Consulta recibida',
    successBody: 'Gracias por la invitación. Rosa te contactará para conversar los detalles del evento.',
  },
};

/**
 * sanitize — Limpieza básica del input del usuario.
 * Remueve tags HTML por si el backend no sanitiza, y recorta espacios.
 */
function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim();
}

export default function ContactForm({ variant = 'individual', onDark = false }) {
  const config = VARIANTS[variant] ?? VARIANTS.individual;

  // Estado inicial: un string vacío por cada campo de la variante
  const emptyValues = Object.fromEntries(config.fields.map((f) => [f, '']));

  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  /* ── Validación en cliente ─────────────────────────────────── */
  const validate = () => {
    const next = {};

    for (const name of config.fields) {
      const field = FIELD_LIBRARY[name];
      const value = values[name] ?? '';

      if (!field.required && !value.trim()) continue;

      if (name === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          next.email = 'Ingresa un correo válido.';
        }
      } else if (name === 'telefono') {
        if (!/^[\d+\s()-]{7,}$/.test(value)) {
          next.telefono = 'Ingresa un teléfono válido.';
        }
      } else if (name === 'mensaje') {
        if (value.trim().length < 10) {
          next.mensaje = 'Cuéntame un poco más (mínimo 10 caracteres).';
        }
      } else if (field.required && value.trim().length < 2) {
        next[name] = `Completa el campo "${field.label}".`;
      }
    }

    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // El error desaparece en cuanto el usuario empieza a corregir
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la página

    // Honeypot: si viene lleno, es un bot. Fingimos éxito y no enviamos.
    if (honeypot) {
      setStatus('success');
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Llevar el foco al primer campo con error
      const firstError = config.fields.find((f) => nextErrors[f]);
      document.getElementById(`${variant}-${firstError}`)?.focus();
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const payload = Object.fromEntries(
        config.fields.map((f) => [f, sanitize(values[f] ?? '')])
      );

      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          origen: config.source,
          _subject: `${config.subject} — ${payload.nombre}`,
          _replyto: payload.email,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setValues(emptyValues);
        setErrors({});

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: config.source });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', { content_name: config.source });
        }
        return;
      }

      const data = await res.json().catch(() => ({}));
      setErrorMsg(
        (Array.isArray(data?.errors) && data.errors[0]?.message) ||
        'No pudimos enviar tu mensaje. Intenta de nuevo en un momento.'
      );
      setStatus('error');
    } catch {
      setErrorMsg('Sin conexión. Verifica tu red e intenta de nuevo.');
      setStatus('error');
    }
  };

  /* ── Estado de éxito ───────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div
        className={`p-10 rounded-lg text-center ${onDark ? 'bg-sand/[0.06]' : 'card-glass'}`}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ border: '1px solid var(--color-gilt)' }}
        >
          <Check size={22} style={{ color: 'var(--color-gilt)' }} aria-hidden="true" />
        </div>

        <h3 className={`font-display font-light text-[1.65rem] m-0 ${onDark ? 'text-sand' : 'text-olive-dark'}`}>
          {config.successTitle}
        </h3>

        <Hairline className="mx-auto my-6" />

        <p className={`leading-[1.75] m-0 ${onDark ? 'text-sand/70' : 'text-olive-dark/75'}`}>
          {config.successBody}
        </p>

        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={`mt-8 bg-transparent border-0 cursor-pointer font-ui text-[0.82rem]
            underline underline-offset-4 transition-colors duration-300
            ${onDark ? 'text-sand/60 hover:text-sand' : 'text-olive-dark/55 hover:text-olive-dark'}`}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  /* ── Estilos compartidos de campo ──────────────────────────── */
  const inputClass = (hasError) =>
    `w-full px-5 py-4 rounded-md font-ui text-base leading-normal
     transition-all duration-500 ease-out
     ${onDark
      ? 'bg-sand/[0.07] text-sand placeholder:text-sand/35 border'
      : 'bg-white/70 text-olive-dark placeholder:text-olive-dark/35 border'}
     ${hasError
      ? 'border-red-500/70'
      : onDark ? 'border-sand/15 focus:border-gilt' : 'border-olive-dark/15 focus:border-olive-dark/45'}
     placeholder:italic focus:outline-none
     focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]`;

  const labelClass = `block font-ui text-[0.7rem] font-semibold tracking-[0.15em]
    uppercase mb-2.5 ${onDark ? 'text-sand/80' : 'text-olive-dark'}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">

      {/* Honeypot — oculto para humanos, irresistible para bots */}
      <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
        <label htmlFor={`${variant}-website`}>No llenar este campo</label>
        <input
          id={`${variant}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {config.fields.map((name) => {
          const field = FIELD_LIBRARY[name];
          const id = `${variant}-${name}`;
          const hasError = Boolean(errors[name]);
          const isWide = field.type === 'textarea';

          return (
            <div key={name} className={isWide ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className={labelClass}>
                {field.label}
                {!field.required && (
                  <span className={`ml-2 font-normal normal-case tracking-normal
                    ${onDark ? 'text-sand/40' : 'text-olive-dark/40'}`}>
                    (opcional)
                  </span>
                )}
              </label>

              {isWide ? (
                <textarea
                  id={id}
                  name={name}
                  rows={5}
                  value={values[name]}
                  onChange={handleChange}
                  placeholder={config.messageHint || field.placeholder}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${id}-error` : undefined}
                  className={`${inputClass(hasError)} resize-y min-h-[140px]`}
                />
              ) : (
                <input
                  id={id}
                  name={name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${id}-error` : undefined}
                  className={inputClass(hasError)}
                />
              )}

              {hasError && (
                <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-[0.82rem] text-red-500 m-0">
                  <AlertCircle size={13} aria-hidden="true" className="shrink-0" />
                  {errors[name]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Banner de error del servidor */}
      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 px-5 py-4 rounded-md
            border border-red-500/30 bg-red-500/[0.07] text-[0.9rem]"
        >
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-red-500" />
          <span className={onDark ? 'text-sand/85' : 'text-olive-dark/85'}>{errorMsg}</span>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`btn-luxury ${onDark ? 'btn-luxury--onDark' : ''}
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              <span>Enviando…</span>
            </>
          ) : (
            <>
              <Send size={14} aria-hidden="true" />
              <span>{config.submitLabel}</span>
              <span className="btn-luxury-dot" aria-hidden="true" />
            </>
          )}
        </button>

        <p className={`text-[0.8rem] leading-relaxed m-0 ${onDark ? 'text-sand/50' : 'text-olive-dark/50'}`}>
          Tus datos se usan solo para responderte. No se comparten con terceros.
        </p>
      </div>
    </form>
  );
}
