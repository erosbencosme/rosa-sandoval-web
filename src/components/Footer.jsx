import { Instagram, Youtube, Linkedin, MessageCircle, Mail, MapPin } from 'lucide-react';
import Link from './Link';
import {
  BRAND,
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  WHATSAPP_MESSAGE,
  LOCATION,
  LEGAL,
} from '../constants';

// ================================================================
// Footer.jsx — Pie de página sitewide
// ================================================================
//
// El documento de arquitectura pide explícitamente en el footer:
//   · Política de privacidad y términos de uso
//     (obligatorio: el sitio recoge datos personales en los formularios)
//   · Enlaces a redes sociales
//   · Datos de contacto directo: teléfono y correo
//   · Aviso de copyright y de "GPS de la Abundancia®" como marca
// ================================================================

/** Columna 1 del sitemap */
const exploreLinks = [
  { to: '/sobre-rosa', label: 'Sobre Rosa' },
  { to: '/para-ti', label: 'Para Ti' },
  { to: '/para-empresas', label: 'Para Empresas' },
  { to: '/gps-de-la-abundancia', label: 'GPS de la Abundancia®' },
];

/** Columna 2 del sitemap */
const resourceLinks = [
  { to: '/libro', label: 'El Libro' },
  { to: '/podcast', label: 'Podcast' },
  { to: '/testimonios', label: 'Testimonios' },
  { to: '/blog', label: 'Blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  // Solo mostramos las redes que tienen URL configurada.
  // Así LinkedIn no aparece como enlace muerto mientras no exista el perfil.
  const socials = [
    { href: SOCIAL_LINKS.instagram, icon: Instagram, label: 'Instagram' },
    { href: SOCIAL_LINKS.youtube, icon: Youtube, label: 'YouTube' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: SOCIAL_LINKS.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
  ].filter((s) => Boolean(s.href));

  const linkClass = `text-sand/65 text-[0.92rem] no-underline
    transition-colors duration-300 hover:text-sand`;

  const headingClass = `font-ui font-semibold text-[0.7rem] uppercase
    tracking-[0.2em] text-beige mb-6`;

  return (
    <footer style={{ background: 'var(--color-rich)' }} className="text-sand pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-[6%]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">

          {/* ── Marca ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block no-underline" aria-label="Ir al inicio">
              <img
                src="./logo.png"
                alt="Rosa Sandoval Polanco"
                className="h-10 w-auto mb-6 brightness-0 invert opacity-90"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </Link>

            <p className="text-sand/65 text-[0.92rem] leading-[1.7] max-w-[300px] m-0">
              {BRAND.tagline}
            </p>

            <div aria-hidden="true" className="mt-6 h-px w-10" style={{ background: 'var(--color-gilt)', opacity: 0.6 }} />
          </div>

          {/* ── Explorar ── */}
          <nav aria-label="Secciones principales">
            <h2 className={headingClass}>Explorar</h2>
            <ul className="list-none m-0 p-0 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Recursos ── */}
          <nav aria-label="Recursos">
            <h2 className={headingClass}>Recursos</h2>
            <ul className="list-none m-0 p-0 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contacto ── */}
          <div>
            <h2 className={headingClass}>Contacto</h2>

            <ul className="list-none m-0 p-0 space-y-4 mb-8">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`${linkClass} inline-flex items-start gap-3 break-all`}
                >
                  <Mail size={15} aria-hidden="true" className="mt-1 shrink-0 text-beige" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-3`}
                >
                  <MessageCircle size={15} aria-hidden="true" className="shrink-0 text-beige" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-sand/65 text-[0.92rem] inline-flex items-center gap-3">
                <MapPin size={15} aria-hidden="true" className="shrink-0 text-beige" />
                {LOCATION}
              </li>
            </ul>

            {/* Redes sociales */}
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-md bg-sand/10 flex items-center justify-center
                        text-sand/80 transition-all duration-300
                        hover:bg-beige hover:text-rich hover:-translate-y-0.5"
                      aria-label={social.label}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Barra inferior: legal ── */}
        <div className="border-t border-sand/10 pt-8 flex flex-col lg:flex-row
          items-center justify-between gap-5 text-center lg:text-left">

          <p className="text-sand/45 text-[0.82rem] m-0 order-2 lg:order-1">
            © {year} {BRAND.name}. Todos los derechos reservados.
            <span className="hidden lg:inline"> · </span>
            <br className="lg:hidden" />
            {LEGAL.trademarkNotice}
          </p>

          <nav aria-label="Enlaces legales" className="order-1 lg:order-2">
            <ul className="list-none m-0 p-0 flex items-center gap-6">
              <li>
                <Link to="/privacidad" className="text-sand/45 text-[0.82rem] no-underline
                  transition-colors duration-300 hover:text-sand/80">
                  Política de privacidad
                </Link>
              </li>
              <li aria-hidden="true" className="w-px h-3 bg-sand/20" />
              <li>
                <Link to="/terminos" className="text-sand/45 text-[0.82rem] no-underline
                  transition-colors duration-300 hover:text-sand/80">
                  Términos de uso
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
