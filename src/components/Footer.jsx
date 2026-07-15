import { Instagram, Youtube, MessageCircle, Heart } from 'lucide-react';

const footerLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#pilares', label: 'Metodología' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#cursos', label: 'Cursos' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#blog', label: 'Blog' },
    { href: '#contacto', label: 'Contacto' },
];

const socialLinks = [
    { href: 'https://instagram.com/rosasandovalP', icon: Instagram, label: 'Instagram' },
    { href: 'https://www.youtube.com/@NuestroEspacioPodcast-h3w/videos', icon: Youtube, label: 'YouTube' },
    { href: 'https://wa.me/18494720939', icon: MessageCircle, label: 'WhatsApp' },
];

export default function Footer() {
    const scrollTo = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    return (
        <footer className="bg-olive-dark text-white py-20">
            <div className="max-w-[1400px] mx-auto px-[6%]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand */}
                    <div>
                        <img
                            src="/logo.png"
                            alt="Rosa Sandoval Logo"
                            className="h-10 w-auto mb-6 brightness-0 invert opacity-90"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <p className="text-white/70 text-sm leading-relaxed max-w-[300px]">
                            Coach Financiera Certificada. Ayudando a mujeres a transformar
                            su relación con el dinero desde el Ser, Hacer y Tener.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-beige">
                            Navegación
                        </h4>
                        <ul className="list-none m-0 p-0 space-y-3">
                            {footerLinks.map(link => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollTo(e, link.href)}
                                        className="text-white/70 text-sm no-underline
                      transition-colors duration-300 hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social + Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-beige">
                            Sígueme
                        </h4>
                        <div className="flex gap-4 mb-8">
                            {socialLinks.map(social => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center
                      justify-center transition-all duration-300
                      hover:bg-beige hover:text-olive-dark hover:scale-110"
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed">
                            <strong className="text-white">Email:</strong> rsansovalpolanco@gmail.com<br />
                            <strong className="text-white">WhatsApp:</strong> +1 849-472-0939
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row
          items-center justify-between gap-4">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Rosa Sandoval Polanco. Todos los derechos reservados.
                    </p>
                    <p className="text-white/50 text-xs flex items-center gap-1">
                        Hecho con <Heart size={12} className="text-beige" /> en República Dominicana
                    </p>
                </div>
            </div>
        </footer>
    );
}
