import { BookOpen, ArrowRight } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const posts = [
    {
        title: '5 Creencias Limitantes que te Impiden Ahorrar',
        excerpt: 'Descubre las creencias inconscientes que sabotean tu relación con el dinero y cómo transformarlas.',
        category: 'Mentalidad',
        date: '15 Feb 2026',
        readTime: '5 min',
    },
    {
        title: 'Cómo Crear un Presupuesto que Realmente Funcione',
        excerpt: 'El método paso a paso para diseñar un presupuesto realista que se adapte a tu estilo de vida.',
        category: 'Estrategia',
        date: '8 Feb 2026',
        readTime: '7 min',
    },
    {
        title: 'Tu Primera Inversión: Guía para Principiantes',
        excerpt: 'Todo lo que necesitas saber para dar tus primeros pasos en el mundo de las inversiones sin miedo.',
        category: 'Inversión',
        date: '1 Feb 2026',
        readTime: '6 min',
    },
];

export default function Blog() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section id="blog" className="py-[120px] bg-white" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto px-[6%]">
                <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="text-[0.85rem] font-semibold text-olive tracking-[2px] uppercase mb-4 block">
                        Blog
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-black text-olive mb-6 leading-tight">
                        Últimas publicaciones
                    </h2>
                    <p className="text-lg text-gray-text max-w-[600px] mx-auto mb-16 leading-relaxed">
                        Contenido gratuito para comenzar tu transformación financiera hoy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={post.title}
                            className={`group bg-gray-soft rounded-3xl overflow-hidden
                transition-all duration-500 hover:-translate-y-2
                hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)]
                cursor-pointer border border-transparent hover:border-beige/20
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                        >
                            {/* Thumbnail placeholder */}
                            <div className="h-48 bg-gradient-to-br from-beige-light to-beige/30
                flex items-center justify-center relative overflow-hidden">
                                <BookOpen size={48} className="text-olive/30" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-olive text-white text-xs font-bold px-3 py-1.5
                    rounded-full uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-3 text-xs text-gray-muted mb-4">
                                    <span>{post.date}</span>
                                    <span>·</span>
                                    <span>{post.readTime} lectura</span>
                                </div>

                                <h3 className="text-xl font-bold text-olive mb-3 leading-snug
                  group-hover:text-olive-dark transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-gray-text text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>

                                <span className="inline-flex items-center gap-2 text-olive font-semibold
                  text-sm transition-all duration-300 group-hover:text-olive-dark
                  group-hover:gap-3">
                                    Leer más
                                    <ArrowRight size={16} className="transition-transform duration-300
                    group-hover:translate-x-1" />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
