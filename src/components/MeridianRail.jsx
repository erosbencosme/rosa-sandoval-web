import { useEffect, useRef, useState } from 'react';

/**
 * MeridianRail — El riesgo firmado del diseño.
 *
 * Un raíl vertical fino en el margen izquierdo del viewport,
 * con un punto oliva-oscuro que viaja a medida que el usuario
 * recorre el journey (Hero → Method → BuyBlock).
 *
 * La coordenada mono arriba del raíl cambia según la posición:
 *   18°28′N — Ser       (inicio)
 *   70°42′W — Hacer     (medio)
 *   ∞ — Tener           (final)
 *
 * Reglas de diseño:
 *  · Sólo se renderiza en ≥ lg (desktop). En móvil desaparece.
 *  · aria-hidden — decorativo puro, cero coste de accesibilidad.
 *  · Respeta prefers-reduced-motion — el punto salta sin animar.
 *  · Un solo requestAnimationFrame, un solo scroll listener.
 *  · Portaled fuera de las secciones, fixed en viewport.
 *
 * Requiere que existan en el DOM los IDs:
 *   #home  (inicio del journey)
 *   #method y/o #buy (fin del journey — usa el más profundo disponible)
 */
export default function MeridianRail() {
    const [progress, setProgress] = useState(0);
    const [coord, setCoord] = useState({ label: '18°28′N', pillar: 'Ser' });
    const rafRef = useRef(null);
    const reducedMotionRef = useRef(false);

    useEffect(() => {
        reducedMotionRef.current =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const update = () => {
            const start = document.getElementById('home');
            const end =
                document.getElementById('buy') ||
                document.getElementById('praise') ||
                document.getElementById('method');
            if (!start || !end) return;

            const startY = start.offsetTop;
            const endY = end.offsetTop + end.offsetHeight;
            const total = Math.max(1, endY - startY - window.innerHeight);
            const scrolled = window.scrollY - startY;
            const p = Math.max(0, Math.min(1, scrolled / total));
            setProgress(p);

            if (p < 0.34) setCoord({ label: '18°28′N', pillar: 'Ser' });
            else if (p < 0.68) setCoord({ label: '70°42′W', pillar: 'Hacer' });
            else setCoord({ label: '∞', pillar: 'Tener' });
        };

        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                update();
                rafRef.current = null;
            });
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const dotTransition = reducedMotionRef.current
        ? 'none'
        : 'top 700ms cubic-bezier(0.22, 1, 0.36, 1)';

    return (
        <aside
            aria-hidden="true"
            className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-40
        pointer-events-none flex-col items-center gap-6 select-none"
        >
            {/* Coordenada activa — arriba del raíl */}
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase whitespace-nowrap
        text-olive-dark/70 transition-opacity duration-300">
                <span>{coord.label}</span>
                <span className="text-olive-dark/30 mx-2">—</span>
                <span>{coord.pillar}</span>
            </div>

            {/* El raíl */}
            <div className="relative h-[46vh] w-px bg-olive-dark/15">

                {/* Ticks — inicio, medio, fin */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-px bg-olive-dark/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-px bg-olive-dark/20" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-px bg-olive-dark/30" />

                {/* Punto viajero */}
                <div
                    className="absolute left-1/2 w-2 h-2 rounded-full bg-olive-dark
            shadow-[0_0_0_5px_rgba(46,59,50,0.08)]"
                    style={{
                        top: `${progress * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: dotTransition,
                    }}
                />
            </div>

            {/* Firma editorial — abajo del raíl */}
            <div className="font-mono text-[9px] tracking-[0.32em] uppercase text-olive-dark/35 whitespace-nowrap">
                RS · MMXXVI
            </div>
        </aside>
    );
}
