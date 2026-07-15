import { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { GOOGLE_FORM_URL } from '../constants';

// ================================================================
// Navbar.jsx — Navegación principal con glassmorphism editorial
// ================================================================
//
// Links de navegación:
//   Metodología · Servicios · Testimonios · Contacto · El Libro
//
// Integración con Hash Routing (App.jsx):
//   · Los links de sección (#pilares, #contacto, etc.) hacen smooth
//     scroll cuando estamos en Home.
//   · Si estamos en la vista del libro (#/libro), primero navegan
//     a Home y luego hacen scroll a la sección.
//   · "El Libro" navega a #/libro.
//   · El logo siempre vuelve a Home.
//
// GitHub Pages:
//   · Logo usa ruta relativa (./logo.png) para compatibilidad
//   · Todos los hrefs usan formato hash (#/ y #/libro)
//
// Prop:
//   currentView: 'home' | 'book'  (viene de App.jsx)
// ================================================================
export default function Navbar({ currentView = 'home' }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // Post-cleanup: sólo cuatro secciones + El Libro
    const navLinks = [
        { href: '#pilares',     label: 'Metodología' },
        { href: '#servicios',   label: 'Servicios' },
        { href: '#testimonios', label: 'Testimonios' },
        { href: '#contacto',    label: 'Contacto' },
    ];

    const closeMobile = () => setMenuOpen(false);

    const smoothScrollTo = (href) => {
        const el = document.querySelector(href);
        if (!el) return;
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    const waitForElementAndScroll = (selector, maxAttempts = 60) => {
        let attempts = 0;
        const tick = () => {
            attempts += 1;
            const el = document.querySelector(selector);
            if (el) {
                window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                return;
            }
            if (attempts < maxAttempts) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const changeHashSilently = (newHash) => {
        window.history.pushState(null, '', newHash);
        window.dispatchEvent(new Event('hashchange'));
    };

    const handleAnchorClick = (e, href) => {
        e.preventDefault();
        closeMobile();

        if (currentView === 'book') {
            changeHashSilently(href);
            waitForElementAndScroll(href);
        } else {
            smoothScrollTo(href);
        }
    };

    const handleBookClick = (e) => {
        e.preventDefault();
        closeMobile();

        if (currentView === 'book') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        changeHashSilently('#/libro');
    };

    // Logo → volver al inicio de la vista Home
    const handleLogoClick = (e) => {
        e.preventDefault();
        closeMobile();
        if (currentView === 'book') {
            changeHashSilently('#home');
            waitForElementAndScroll('#home');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isOnBook = currentView === 'book';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 h-20 z-[1000]
        transition-all duration-500 ease-out
        ${scrolled
                    ? 'bg-cream/85 backdrop-blur-xl border-b border-olive-dark/[0.08] shadow-[0_10px_40px_-20px_rgba(46,59,50,0.18)]'
                    : 'bg-cream/40 backdrop-blur-xl border-b border-olive-dark/[0.06]'}
      `}
            aria-label="Navegación principal"
        >
            <div className="max-w-[1400px] mx-auto px-[6%] h-full flex items-center justify-between gap-6">

                {/* Logo */}
                <a
                    href="#home"
                    onClick={handleLogoClick}
                    className="flex-shrink-0 pr-4 no-underline"
                    aria-label="Rosa Sandoval — Ir al inicio"
                >
                    <img
                        src="./logo.png"
                        alt="Rosa Sandoval Logo"
                        className="h-[38px] w-auto transition-transform duration-500 hover:scale-[1.04]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const sib = e.target.nextElementSibling;
                            if (sib) sib.style.display = 'block';
                        }}
                    />
                    <span
                        className="hidden font-display text-olive-dark font-normal italic text-lg"
                        style={{ display: 'none' }}
                    >
                        Rosa Sandoval
                    </span>
                </a>

                {/* ── Desktop Nav ── */}
                <ul className="hidden md:flex list-none gap-8 items-center mx-auto flex-1 justify-center m-0 p-0">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className="relative text-olive-dark font-ui font-medium text-[0.82rem]
                  tracking-[0.06em] no-underline px-1 py-2
                  transition-colors duration-300 hover:text-olive
                  after:content-[''] after:absolute after:bottom-[6px] after:left-1/2
                  after:w-0 after:h-px after:bg-olive after:transition-all
                  after:duration-500 after:-translate-x-1/2 hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}

                    {/* Divisor editorial vertical */}
                    <li aria-hidden="true" className="w-px h-4 bg-olive-dark/20" />

                    {/* El Libro */}
                    <li>
                        <a
                            href="#/libro"
                            onClick={handleBookClick}
                            aria-current={isOnBook ? 'page' : undefined}
                            className={`group inline-flex items-center gap-2 font-ui font-medium
                text-[0.82rem] tracking-[0.06em] px-1 py-2 no-underline
                transition-colors duration-300
                ${isOnBook ? 'text-olive-dark' : 'text-olive-dark hover:text-olive'}`}
                        >
                            <BookOpen
                                size={13}
                                aria-hidden="true"
                                style={{ color: 'var(--color-gilt)' }}
                                className={`transition-opacity duration-300 ${isOnBook ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                            />
                            <span className="relative">
                                El Libro
                                <span
                                    aria-hidden="true"
                                    className={`absolute -bottom-[6px] left-0 h-px transition-all duration-500 ease-out
                    ${isOnBook ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                                    style={{ background: 'var(--color-gilt)' }}
                                />
                            </span>
                        </a>
                    </li>
                </ul>

                {/* CTA principal */}
                <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-2 bg-olive-dark text-cream
            px-5 py-2.5 rounded-md font-ui font-medium text-[0.78rem]
            tracking-[0.12em] uppercase no-underline whitespace-nowrap
            shadow-[0_4px_18px_-6px_rgba(46,59,50,0.35)]
            transition-all duration-500 ease-out
            hover:bg-olive hover:-translate-y-0.5
            hover:shadow-[0_10px_28px_-6px_rgba(46,59,50,0.45)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-dark
            focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                    Agenda tu cita
                </a>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen((p) => !p)}
                    className="md:hidden flex items-center justify-center bg-transparent border-0
            cursor-pointer p-2 z-[1001] text-olive-dark"
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <div
                className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-80px)]
          bg-cream/98 backdrop-blur-xl flex flex-col items-center pt-14 px-8 gap-4
          transition-all duration-500 ease-out z-[999] overflow-y-auto
          ${menuOpen
                        ? 'translate-x-0 opacity-100 visible'
                        : '-translate-x-full opacity-0 invisible'}`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="text-olive-dark font-ui text-xl font-medium tracking-wide p-3 no-underline
              transition-colors duration-300 hover:text-olive"
                    >
                        {link.label}
                    </a>
                ))}

                <div
                    aria-hidden="true"
                    className="w-16 h-px my-2"
                    style={{ background: 'var(--color-gilt)', opacity: 0.6 }}
                />

                <a
                    href="#/libro"
                    onClick={handleBookClick}
                    aria-current={isOnBook ? 'page' : undefined}
                    className={`inline-flex items-center gap-2 font-ui text-xl font-medium tracking-wide
            p-3 no-underline transition-colors duration-300
            ${isOnBook ? 'text-olive-dark' : 'text-olive-dark hover:text-olive'}`}
                >
                    <BookOpen size={18} aria-hidden="true" style={{ color: 'var(--color-gilt)' }} />
                    El Libro
                </a>

                <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="bg-olive-dark text-cream px-7 py-3.5 rounded-md
            font-ui font-medium text-sm tracking-[0.12em] uppercase no-underline mt-6
            shadow-[0_4px_18px_-6px_rgba(46,59,50,0.35)] transition-all duration-500 ease-out
            hover:bg-olive"
                >
                    Agenda tu cita
                </a>
            </div>
        </nav>
    );
}
