// ================================================================
// content.js — CONTENIDO EDITORIAL DEL SITIO
// ================================================================
//
// Aquí vive el contenido que cambia con frecuencia: testimonios y
// artículos del blog. Los datos estructurales (enlaces, marca,
// taxonomías) están en constants.js.
//
// ⚠️⚠️ CONTENIDO PENDIENTE DE REEMPLAZO ⚠️⚠️
//
// Los testimonios y artículos de abajo son PLACEHOLDERS con la
// estructura correcta, no contenido real.
//
// La versión anterior del sitio publicaba testimonios inventados con
// promesas financieras concretas ("mi cuenta bancaria duplicó en 3
// meses", "cero deudas en 6 meses"). Eso se retiró a propósito: son
// afirmaciones de resultado atribuidas a personas que no existen, con
// riesgo reputacional y legal en un servicio financiero.
//
// Al reemplazar, pedir a cada persona:
//   1. Autorización escrita para publicar nombre y testimonio.
//   2. Que el texto describa su EXPERIENCIA, no una cifra garantizada.
//   3. Rol y contexto reales (empresa, cargo) si autoriza.
//
// Mientras `pending: true`, la página muestra un aviso discreto de
// que los testimonios se están recopilando.
// ================================================================

/* ================================================================
   TESTIMONIOS
   ================================================================
   category debe coincidir con un slug de TESTIMONIAL_CATEGORIES
   en constants.js: 'mentoria' | 'conferencias' | 'empresas' |
   'educacion-financiera'
*/

/** Cambiar a false cuando haya testimonios reales cargados */
export const TESTIMONIALS_PENDING = true;

export const TESTIMONIALS = [
  {
    category: 'mentoria',
    text:
      'Llegué buscando ordenar mis cuentas y terminé entendiendo de dónde venía mi manera de decidir. Rosa sostiene la conversación sin juzgar y con una claridad que se agradece.',
    author: 'Nombre por confirmar',
    role: 'Participante de mentoría',
  },
  {
    category: 'mentoria',
    text:
      'Lo que más valoro es que no me dio una fórmula: me ayudó a construir la mía, con mi realidad y mis tiempos.',
    author: 'Nombre por confirmar',
    role: 'Participante de mentoría',
  },
  {
    category: 'conferencias',
    text:
      'Salimos de la charla conversando entre nosotros. Eso no pasa siempre. Rosa conecta con la sala desde el primer minuto.',
    author: 'Nombre por confirmar',
    role: 'Asistente a conferencia',
  },
  {
    category: 'conferencias',
    text:
      'Un taller práctico, sin relleno. Cada ejercicio tenía un para qué claro y me llevé cosas que apliqué esa misma semana.',
    author: 'Nombre por confirmar',
    role: 'Participante de taller',
  },
  {
    category: 'empresas',
    text:
      'Contratamos el programa para el equipo y el efecto se notó en el clima laboral. Rosa entiende el contexto de una organización, no llega con un discurso genérico.',
    author: 'Nombre por confirmar',
    role: 'Gestión Humana',
  },
  {
    category: 'empresas',
    text:
      'La coordinación fue impecable y el contenido se adaptó a lo que necesitábamos. Repetiríamos sin dudarlo.',
    author: 'Nombre por confirmar',
    role: 'Dirección de Talento',
  },
  {
    category: 'educacion-financiera',
    text:
      'Nunca me habían explicado el dinero de una forma que pudiera entender sin sentirme en falta. Cambió mi manera de mirar mis decisiones.',
    author: 'Nombre por confirmar',
    role: 'Participante de formación',
  },
  {
    category: 'educacion-financiera',
    text:
      'Es educación financiera con lenguaje humano. Salí con herramientas concretas y sin la sensación de haber recibido un sermón.',
    author: 'Nombre por confirmar',
    role: 'Participante de formación',
  },
];


/* ================================================================
   BLOG
   ================================================================
   category → slug de BLOG_CATEGORIES en constants.js
   method   → 'Ser' | 'Hacer' | 'Tener'  (filtro SECUNDARIO)
   cafe     → true si pertenece a la serie "Café con Rosa"
   url      → enlace al artículo. Si está vacío, la tarjeta se
              muestra como "Próximamente" y no es clicable.
*/

/** Cambiar a false cuando haya artículos reales publicados */
export const POSTS_PENDING = true;

export const POSTS = [
  {
    title: 'Las creencias sobre el dinero que heredaste sin darte cuenta',
    excerpt:
      'Tu manera de decidir con el dinero empezó a formarse mucho antes de tu primer sueldo. Un recorrido por las historias familiares que siguen operando en silencio.',
    category: 'dinero-con-proposito',
    method: 'Ser',
    date: '2026-08-20',
    readTime: '6 min',
    url: '',
  },
  {
    title: 'Un presupuesto que respira: cómo construirlo sin abandonarlo en marzo',
    excerpt:
      'La mayoría de los presupuestos fallan por rígidos, no por complicados. Cómo diseñar uno que aguante la vida real.',
    category: 'dinero-con-proposito',
    method: 'Hacer',
    date: '2026-08-12',
    readTime: '7 min',
    url: '',
  },
  {
    title: 'Cuando el problema no es cuánto ganas',
    excerpt:
      'Aumentar los ingresos sin cambiar la manera de decidir suele producir el mismo resultado, en otra escala.',
    category: 'desarrollo-personal',
    method: 'Ser',
    date: '2026-08-05',
    readTime: '5 min',
    url: '',
  },
  {
    title: 'Liderar sin agotarte: la conversación que casi nadie tiene con su equipo',
    excerpt:
      'Sostener a otros exige una base propia. Qué revisar antes de pedirle más a tu gente.',
    category: 'liderazgo',
    method: 'Hacer',
    date: '2026-07-28',
    readTime: '6 min',
    url: '',
  },
  {
    title: 'Bienestar financiero del colaborador: por qué es un asunto de la empresa',
    excerpt:
      'La preocupación económica no se queda en casa: entra a la oficina, ocupa atención y afecta el desempeño.',
    category: 'empresas',
    method: 'Tener',
    date: '2026-07-19',
    readTime: '8 min',
    url: '',
  },
  {
    title: 'El servicio al cliente empieza mucho antes del cliente',
    excerpt:
      'Equipos que se sienten cuidados cuidan mejor. Una mirada al servicio como cultura y no como protocolo.',
    category: 'empresas',
    method: 'Hacer',
    date: '2026-07-10',
    readTime: '5 min',
    url: '',
  },

  // ── Serie "Café con Rosa" ────────────────────────────────────
  {
    title: 'Sobre la prisa',
    excerpt:
      'Hay decisiones que sólo se ven bien cuando uno se detiene. Una reflexión corta sobre el costo de vivir apurados.',
    category: 'desarrollo-personal',
    method: 'Ser',
    date: '2026-08-22',
    readTime: '3 min',
    cafe: true,
    url: '',
  },
  {
    title: 'Lo que aprendí diciendo que no',
    excerpt:
      'Durante años dije que sí a todo por miedo a perder algo. Lo que descubrí del otro lado.',
    category: 'desarrollo-personal',
    method: 'Ser',
    date: '2026-08-08',
    readTime: '4 min',
    cafe: true,
    url: '',
  },
  {
    title: 'La mesa, el café y las conversaciones que cambian cosas',
    excerpt:
      'Por qué las decisiones importantes casi nunca se toman en una reunión formal.',
    category: 'liderazgo',
    method: 'Ser',
    date: '2026-07-25',
    readTime: '3 min',
    cafe: true,
    url: '',
  },
];

/**
 * formatPostDate — '2026-08-20' → '20 ago 2026'
 * Se construye desde las partes para evitar el desfase de zona
 * horaria que introduce new Date('YYYY-MM-DD') (se interpreta UTC).
 */
export function formatPostDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${day} ${meses[month - 1]} ${year}`;
}
