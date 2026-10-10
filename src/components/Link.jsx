import { useCallback } from 'react';
import { navigate } from '../router';

// ================================================================
// Link.jsx — Enlace interno del sitio
// ================================================================
//
// Vive en su propio archivo (y no dentro de router.js) porque Fast
// Refresh solo funciona cuando un módulo exporta exclusivamente
// componentes. router.js exporta rutas, hooks y utilidades, así que
// mezclarlos rompería el hot reload de todo el sitio en desarrollo.
//
// Renderiza un <a> REAL con href="#/ruta". Eso importa:
//   · Es accesible (los lectores de pantalla lo anuncian como enlace)
//   · Se puede abrir en pestaña nueva con Ctrl/Cmd + clic
//   · El navegador muestra el destino en la barra de estado
//
// El clic se intercepta para navegar sin recargar, pero se respetan
// los modificadores del teclado y el clic de rueda: en esos casos
// dejamos pasar el comportamiento nativo del navegador.
// ================================================================

export default function Link({ to, children, className, onClick, ...rest }) {
  const handleClick = useCallback(
    (e) => {
      // Clic con modificador o botón distinto al principal:
      // que el navegador haga lo suyo (pestaña nueva, ventana nueva…)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      e.preventDefault();
      onClick?.(e);
      navigate(to);
    },
    [to, onClick]
  );

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
