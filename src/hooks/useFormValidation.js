import { useState, useCallback } from 'react';

/**
 * Hook de validación de formulario en tiempo real
 * Valida nombre, email, teléfono y mensaje
 */
export default function useFormValidation() {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validators = {
    nombre: (v) => {
      if (!v.trim()) return 'El nombre es requerido';
      if (v.trim().length < 2) return 'Mínimo 2 caracteres';
      return '';
    },
    email: (v) => {
      if (!v.trim()) return 'El email es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Email inválido';
      return '';
    },
    telefono: (v) => {
      if (!v.trim()) return 'El teléfono es requerido';
      if (!/^[\d\s\-\+\(\)]{7,15}$/.test(v.replace(/\s/g, ''))) return 'Teléfono inválido';
      return '';
    },
    mensaje: (v) => {
      if (!v.trim()) return 'El mensaje es requerido';
      if (v.trim().length < 10) return 'Mínimo 10 caracteres';
      return '';
    },
  };

  const validateField = useCallback((name, value) => {
    return validators[name] ? validators[name](value) : '';
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validators).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ nombre: true, email: true, telefono: true, mensaje: true });
    return isValid;
  }, [values, validateField]);

  const handleSubmit = useCallback(async (googleScriptUrl) => {
    if (!validateAll()) return false;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Enviar a Google Sheets via Google Apps Script
      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // Track conversion event
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', { event_category: 'lead', event_label: 'contacto' });
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

      setSubmitStatus('success');
      setValues({ nombre: '', email: '', telefono: '', mensaje: '' });
      setTouched({});
      setErrors({});
      return true;
    } catch {
      setSubmitStatus('error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateAll]);

  const getFieldState = useCallback((name) => {
    if (!touched[name]) return 'idle';
    return errors[name] ? 'error' : 'valid';
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldState,
    setSubmitStatus,
  };
}
