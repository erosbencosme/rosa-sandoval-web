import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigate } from '../router';
import Link from './Link';

// ================================================================
// Navbar.jsx — Navegación principal
// ================================================================
//
// Estructura pedida en el documento de arquitectura (Ago 2026):
//
//   INICIO | SOBRE ROSA | PARA TI | PARA EMPRESAS |
//   GPS DE LA ABUNDANCIA® | RECURSOS ▾ | BLOG | CONTACTO
//
//   Submenú de Recursos: Libro · Podcast · Testimonios
//
// "Cursos online" NO aparece: se retiró hasta que exista el producto,
// para no dejar un enlace a una página vacía en el lanzamiento.
//
// Breakpoint:
//   ≥ xl (1280px) → navegación completa horizontal
//   < xl          → menú hamburguesa (8 ítems no caben legibles antes)
//
// El CTA "Sesión de claridad" está siempre visible desde md porque es
// la conversión principal del sitio.
// ================================================================

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-rosa', label: 'Sobre Rosa' },
  { to: '/para-ti', label: 'Para Ti' },
  { to: '/para-empresas', label: 'Para Empresas' },
  { to: '/gps-de-la-abundancia', label: 'GPS de la Abundancia®' },
];

const resourceLinks = [
  { to: '/libro', label: 'Libro' },
  { to: '/podcast', label: 'Podcast' },
  { to: '/testimonios', label: 'Testimonios' },
];

const tailLinks = [
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
];

/** Todas las rutas que cuelgan de "Recursos", para marcar el padre activo */
const resourcePaths = resourceLinks.map((l) => l.to);

/**
 * Underline — subrayado gilt animado de los enlaces de escritorio.
 * Ancho completo si la ruta está activa; crece desde cero en hover si no.
 */
function Underline({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-1 left-0 h-px transition-all duration-500 ease-out
        ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
      style={{ background: 'var(--color-gilt)' }}
    />
  );
}

export default function Navbar({ currentRoute = '/' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef(null);

  // Sombra y opacidad del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear el scroll del body mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /**
   * closeAll — Cierra los menús al navegar.
   *
   * Se llama desde el onClick de cada enlace, no desde un efecto que
   * observe la ruta. Reaccionar al cambio de ruta con setState dentro
   * de un useEffect provoca un render en cascada (React lo desaconseja
   * expresamente) y aquí es innecesario: sabemos exactamente cuándo se
   * navega, porque es el usuario quien hace clic.
   */
  const closeAll = () => {
    setMenuOpen(false);
    setResourcesOpen(false);
    setMobileResourcesOpen(false);
  };

  // Cerrar el submenú de Recursos al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!resourcesOpen) return;

    const onPointerDown = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setResourcesOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [resourcesOpen]);

  const isActive = (to) => currentRoute === to;
  const isResourceActive = resourcePaths.includes(currentRoute);

  // Estilo compartido de los enlaces de escritorio.
  // El subrayado gilt se dibuja con un <span> hijo (ver Underline) en vez
  // de un pseudo-elemento, porque necesita el color del theme como
  // variable CSS y Tailwind no puede interpolarla en after:bg-*.
  const deskLink = (active) => `group relative font-ui font-medium text-[0.72rem]
    tracking-[0.08em] uppercase no-underline whitespace-nowrap px-1 py-2
    transition-colors duration-300
    ${active ? 'text-olive-dark' : 'text-olive-dark/75 hover:text-olive-dark'}`;

  const mobileLink = (active) => `font-ui text-lg font-medium tracking-wide py-3 no-underline
    transition-colors duration-300
    ${active ? 'text-olive' : 'text-olive-dark hover:text-olive'}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-20 z-[1000] transition-all duration-500 ease-out
        ${scrolled
          ? 'bg-cream/90 backdrop-blur-xl border-b border-olive-dark/[0.08] shadow-[0_10px_40px_-20px_rgba(46,59,50,0.18)]'
          : 'bg-cream/40 backdrop-blur-xl border-b border-olive-dark/[0.06]'}`}
      aria-label="Navegación principal"
    >
      <div className="max-w-[1500px] mx-auto px-[4%] h-full flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex-shrink-0 no-underline flex items-center"
          aria-label="Rosa Sandoval Polanco — Ir al inicio"
        >
          <img
            src="./logo.png"
            alt="Rosa Sandoval Polanco"
            className="h-[36px] w-auto transition-transform duration-500 hover:scale-[1.04]"
            onError={(e) => {
              // Si el logo falla, mostramos el nombre en su lugar
              e.currentTarget.style.display = 'none';
              const sib = e.currentTarget.nextElementSibling;
              if (sib) sib.removeAttribute('hidden');
            }}
          />
          <span hidden className="font-display text-olive-dark font-normal italic text-lg">
            Rosa Sandoval
          </span>
        </Link>

        {/* ── Navegación de escritorio (≥ xl) ── */}
        <ul className="hidden xl:flex list-none items-center gap-6 m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={deskLink(isActive(link.to))}
              >
                <Underline active={isActive(link.to)} />
                {link.label}
              </Link>
            </li>
          ))}

          {/* Recursos — submenú desplegable */}
          <li className="relative" ref={resourcesRef}>
            <button
              type="button"
              onClick={() => setResourcesOpen((p) => !p)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              className={`${deskLink(isResourceActive)} bg-transparent border-0 cursor-pointer
                inline-flex items-center gap-1.5`}
            >
              <Underline active={isResourceActive} />
              Recursos
              <ChevronDown
                size={12}
                aria-hidden="true"
                className={`transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[190px]
                bg-cream/97 backdrop-blur-xl rounded-md
                border border-olive-dark/10 shadow-[0_20px_50px_-20px_rgba(46,59,50,0.35)]
                transition-all duration-300 ease-out overflow-hidden
                ${resourcesOpen
                  ? 'opacity-100 translate-y-0 visible'
                  : 'opacity-0 -translate-y-2 invisible'}`}
            >
              {/* Hairline gilt superior — firma editorial del submenú */}
              <div aria-hidden="true" className="h-px w-full" style={{ background: 'var(--color-gilt)', opacity: 0.5 }} />

              <ul className="list-none m-0 p-2">
                {resourceLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={isActive(link.to) ? 'page' : undefined}
                      onClick={closeAll}
                      className={`block px-4 py-2.5 rounded font-ui text-[0.78rem] tracking-[0.06em]
                        no-underline transition-colors duration-300
                        ${isActive(link.to)
                          ? 'text-olive-dark bg-olive-dark/[0.06]'
                          : 'text-olive-dark/75 hover:text-olive-dark hover:bg-olive-dark/[0.04]'}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {tailLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={deskLink(isActive(link.to))}
              >
                <Underline active={isActive(link.to)} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA principal ── */}
        <Link
          to="/sesion-de-claridad"
          onClick={closeAll}
          className="hidden md:inline-flex xl:ml-0 ml-auto items-center gap-2 bg-olive-dark text-cream
            px-5 py-2.5 rounded-md font-ui font-medium text-[0.7rem]
            tracking-[0.12em] uppercase no-underline whitespace-nowrap flex-shrink-0
            shadow-[0_4px_18px_-6px_rgba(46,59,50,0.35)]
            transition-all duration-500 ease-out
            hover:bg-olive hover:-translate-y-0.5
            hover:shadow-[0_10px_28px_-6px_rgba(46,59,50,0.45)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-2"
        >
          Sesión de claridad
        </Link>

        {/* ── Hamburguesa ── */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="xl:hidden flex items-center justify-center bg-transparent border-0
            cursor-pointer p-2 z-[1001] text-olive-dark"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ── Menú móvil ── */}
      <div
        className={`xl:hidden fixed top-20 left-0 w-full h-[calc(100vh-80px)]
          bg-cream/98 backdrop-blur-xl flex flex-col items-center pt-10 px-8 pb-16
          transition-all duration-500 ease-out z-[999] overflow-y-auto
          ${menuOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeAll}
            aria-current={isActive(link.to) ? 'page' : undefined}
            className={mobileLink(isActive(link.to))}
          >
            {link.label}
          </Link>
        ))}

        {/* Recursos — acordeón en móvil */}
        <button
          type="button"
          onClick={() => setMobileResourcesOpen((p) => !p)}
          aria-expanded={mobileResourcesOpen}
          className={`${mobileLink(isResourceActive)} bg-transparent border-0 cursor-pointer
            inline-flex items-center gap-2`}
        >
          Recursos
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform duration-300 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`w-full flex flex-col items-center overflow-hidden transition-all duration-500 ease-out
            ${mobileResourcesOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {resourceLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
            onClick={closeAll}
              aria-current={isActive(link.to) ? 'page' : undefined}
              className={`font-ui text-base py-2.5 no-underline transition-colors duration-300
                ${isActive(link.to) ? 'text-olive' : 'text-olive-dark/70 hover:text-olive'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {tailLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeAll}
            aria-current={isActive(link.to) ? 'page' : undefined}
            className={mobileLink(isActive(link.to))}
          >
            {link.label}
          </Link>
        ))}

        <div aria-hidden="true" className="w-16 h-px my-5" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />

        <button
          type="button"
          onClick={() => navigate('/sesion-de-claridad')}
          className="bg-olive-dark text-cream px-7 py-3.5 rounded-md border-0 cursor-pointer
            font-ui font-medium text-sm tracking-[0.12em] uppercase
            shadow-[0_4px_18px_-6px_rgba(46,59,50,0.35)]
            transition-all duration-500 ease-out hover:bg-olive"
        >
          Sesión de claridad
        </button>
      </div>
    </nav>
  );
}
