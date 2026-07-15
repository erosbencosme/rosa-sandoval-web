import { useEffect, useRef, useState } from 'react';

/**
 * Hook que detecta cuando un elemento entra al viewport
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} triggerOnce - Si true, solo dispara una vez
 */
export default function useIntersectionObserver(options = {}, triggerOnce = true) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) observer.unobserve(element);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options, triggerOnce]);

  return [ref, isVisible];
}
