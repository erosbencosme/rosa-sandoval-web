import { useState, useId } from 'react';
import { Plus } from 'lucide-react';

// ================================================================
// Faq.jsx — Acordeón de preguntas frecuentes reutilizable
// ================================================================
//
// Recibe las preguntas por props para que cada página use su propio
// set (la de Mentoría tiene 6, la de Empresas puede tener otras).
//
// Accesibilidad:
//   · <button> real con aria-expanded y aria-controls
//   · El panel se oculta con max-height + aria-hidden, así el
//     contenido cerrado no es alcanzable con el tabulador
//   · Un solo panel abierto a la vez (comportamiento de acordeón)
// ================================================================

export default function Faq({ items, onDark = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const baseId = useId();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <div className="relative">
      {/* Hairline gilt superior — cierra el bloque visualmente */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: 'var(--color-gilt)', opacity: 0.35 }}
      />

      {items.map((item, i) => {
        const isOpen = activeIndex === i;
        const questionId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-p-${i}`;

        return (
          <div
            key={item.question}
            className={`border-b ${onDark ? 'border-sand/12' : 'border-olive-dark/12'}`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={`w-full flex items-start justify-between gap-6 text-left
                  bg-transparent border-0 cursor-pointer py-7
                  font-display font-normal text-[1.1rem] md:text-[1.25rem] leading-[1.4]
                  transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt rounded
                  ${onDark
                    ? isOpen ? 'text-sand' : 'text-sand/80 hover:text-sand'
                    : isOpen ? 'text-olive-dark' : 'text-olive-dark/80 hover:text-olive-dark'}`}
              >
                <span>{item.question}</span>

                <span
                  aria-hidden="true"
                  className={`shrink-0 mt-1 transition-transform duration-500 ease-out
                    ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                  style={{ color: 'var(--color-gilt)' }}
                >
                  <Plus size={18} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
              inert={!isOpen ? '' : undefined}
              className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p
                className={`pb-8 pr-10 text-[1.02rem] leading-[1.8] m-0
                  ${onDark ? 'text-sand/70' : 'text-olive-dark/75'}`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
