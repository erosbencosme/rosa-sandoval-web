import { useEffect, useRef, useState } from 'react';

/**
 * useIntersectionObserver — Detecta cuándo un elemento entra al viewport.
 *
 * Devuelve [ref, isVisible]. Se usa para las animaciones de entrada
 * de todo el sitio (ver el componente Reveal en components/ui.jsx).
 *
 * @param {Object}  options      Opciones del IntersectionObserver
 * @param {boolean} triggerOnce  Si true, deja de observar tras la primera aparición
 *
 * ─────────────────────────────────────────────────────────────────
 * ⚠️ POR QUÉ LAS DEPENDENCIAS SON VALORES SUELTOS Y NO `options`
 *
 * La versión anterior tenía `[options, triggerOnce]` como array de
 * dependencias. Como quien llama al hook escribe el objeto en línea:
 *
 *     useIntersectionObserver({ threshold: 0.12 })
 *
 * ese objeto es NUEVO en cada render. React compara por identidad, así
 * que el efecto se consideraba "cambiado" en cada render: limpiaba el
 * observer (disconnect) y creaba otro.
 *
 * El callback del IntersectionObserver es asíncrono — se entrega en el
 * siguiente frame. Si entre medias llega otro render, el disconnect
 * cancela el callback pendiente y la aparición nunca se registra.
 * Resultado visible: secciones que se quedaban en opacity: 0 para
 * siempre, sobre todo las que ya estaban en pantalla al cargar.
 *
 * Al depender de valores primitivos (número, string), la comparación de
 * React es por valor y el efecto corre UNA vez. El observer vive lo
 * suficiente para disparar.
 * ─────────────────────────────────────────────────────────────────
 */
export default function useIntersectionObserver(options = {}, triggerOnce = true) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extraemos los valores para poder usarlos como dependencias estables
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    root = null,
  } = options;

  // threshold admite array; lo normalizamos a string para comparar por valor
  const thresholdKey = Array.isArray(threshold) ? threshold.join(',') : String(threshold);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Si el navegador no soporta IntersectionObserver, mostramos el
    // contenido directamente: mejor sin animación que invisible.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // ── Comprobación inmediata ──────────────────────────────────
    // Si el elemento YA está en pantalla al montar, lo mostramos sin
    // esperar al observer.
    //
    // Por qué: todo este sistema oculta el contenido (opacity: 0) y lo
    // revela con JavaScript. Si por lo que sea el callback no llega, la
    // sección queda invisible para siempre — el fallo más grave posible,
    // porque el visitante ve una página en blanco sin ningún error.
    //
    // Esta comprobación síncrona cubre todo lo que está sobre la línea
    // de flotación sin depender de que el observer se comporte.
    const rect = element.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;

    // Si el viewport mide 0 no podemos decidir nada: pasa en pestañas que
    // aún no se han pintado, en paneles de previsualización y en algunos
    // navegadores embebidos. En ese caso mostramos el contenido.
    //
    // Regla: NUNCA ocultar contenido que no se puede medir. Es preferible
    // perder la animación de entrada a servir una página en blanco.
    if (viewportH === 0) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    if (rect.top < viewportH && rect.bottom > 0) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);
    return () => observer.disconnect();

    // threshold va representado por thresholdKey (comparación por valor).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thresholdKey, rootMargin, root, triggerOnce]);

  return [ref, isVisible];
}

