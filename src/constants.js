// ================================================================
// ROSA SANDOVAL POLANCO — CONSTANTES CENTRALIZADAS DE PRODUCCIÓN
// ================================================================
//
// 🎯 INSTRUCCIONES: Edita SOLO los valores de abajo.
//    Todo el sitio web se actualiza automáticamente.
//    No necesitas tocar ningún otro archivo.
//
// 📦 DESPLIEGUE: Después de editar, ejecuta:
//    npm run build → npm run deploy
//
// ⚠️ Todo lo marcado con "PENDIENTE" necesita un valor real antes
//    del lanzamiento público.
// ================================================================


// ─────────────────────────────────────────────────────────────────
// 🔗 ENLACES PRINCIPALES
// ─────────────────────────────────────────────────────────────────

/**
 * AMAZON_BOOK_LINK — URL directa para comprar el libro en Amazon.
 * ⚠️ PENDIENTE: reemplazar cuando el libro esté publicado.
 *    Ejemplo: 'https://www.amazon.com/dp/B0XXXXXXXXX'
 */
export const AMAZON_BOOK_LINK = 'https://www.amazon.com/dp/B0H922WZRH';

/** ¿El libro ya está a la venta? Si es false, la UI muestra "Próximamente". */
export const BOOK_ON_SALE = false;

/** Portada del libro — vive en public/images/ */
export const BOOK_COVER_IMAGE_PATH = './images/book-cover.jpg';

/** Retrato de Rosa — descargado localmente, ya no depende del WordPress viejo */
export const ROSA_PORTRAIT_PATH = './images/rosa-sandoval.jpg';

/**
 * CONTACT_FORM_ENDPOINT — Endpoint del formulario de contacto (Formspree).
 * ⚠️ Verificar que esta cuenta de Formspree sea la de Rosa.
 */
export const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xbldpypg';

/** Google Form para agendar la Sesión de Claridad */
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScqF597Q6Zckyk9ZWpUu5sl5Gdj-IZvBtNw7S5P8m8UMV4NFA/viewform';


// ─────────────────────────────────────────────────────────────────
// 📱 CONTACTO Y REDES SOCIALES
// ─────────────────────────────────────────────────────────────────

/** WhatsApp — número sin '+' ni guiones */
export const WHATSAPP_NUMBER = '18494720939';
export const WHATSAPP_DISPLAY = '+1 849-472-0939';
export const WHATSAPP_MESSAGE = '¡Hola Rosa! Me interesa conocer más sobre tu acompañamiento. 🌟';

/** Mensaje de WhatsApp para consultas corporativas */
export const WHATSAPP_MESSAGE_EMPRESA = '¡Hola Rosa! Le escribo desde una organización interesada en tus programas de formación. 🏢';

/** Email de contacto — ⚠️ CONFIRMAR con Rosa (¿rsandoval o rsansoval?) */
export const CONTACT_EMAIL = 'rsansovalpolanco@gmail.com';

/** Canal de YouTube — Nuestro Espacio Podcast */
export const YOUTUBE_URL = 'https://www.youtube.com/@NuestroEspacioPodcast-h3w/videos';

/** ⚠️ PENDIENTE: enlace de Spotify del podcast */
export const SPOTIFY_URL = '';

/** ⚠️ PENDIENTE: perfil de LinkedIn de Rosa */
export const LINKEDIN_URL = '';

/** Redes sociales — enlaces directos */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/rosasandovalp',
  youtube: YOUTUBE_URL,
  linkedin: LINKEDIN_URL,
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
};

/** Ubicación */
export const LOCATION = 'República Dominicana';


// ─────────────────────────────────────────────────────────────────
// 🧭 MARCA — GPS de la Abundancia®
// ─────────────────────────────────────────────────────────────────
//
// Nomenclatura oficial según el documento de arquitectura (Ago 2026).
// Antes se llamaba "Método GPS" en el código; se unificó a la marca real.
//
export const BRAND = {
  name: 'Rosa Sandoval Polanco',
  shortName: 'Rosa Sandoval',
  role: 'Docente · Facilitadora · Coach · Conferencista · Escritora',
  methodology: 'GPS de la Abundancia®',
  methodologyShort: 'GPS de la Abundancia',
  tagline: 'Personas que crecen. Decisiones que transforman. Resultados que avanzan.',
  quote: 'El dinero debe ser una herramienta para vivir, no el protagonista de tu vida.',
};

/** Áreas de expertise — se muestran como barra bajo el hero */
export const EXPERTISE_AREAS = [
  'Conciencia Financiera',
  'Cultura',
  'Bienestar Organizacional y Productividad',
  'Desarrollo Personal',
  'Habilidades blandas',
];

/**
 * Los tres movimientos del GPS de la Abundancia®.
 * FUENTE ÚNICA — la usan la home, la página de metodología y el libro.
 */
export const GPS_PILLARS = [
  {
    numeral: 'I',
    number: '01',
    coord: '18°28′N',
    label: 'Ser',
    subtitle: 'Quién eres',
    short: 'La persona que eres, tus creencias, emociones, valores y propósito.',
    body:
      'Tu relación con el dinero comenzó mucho antes de tu primer sueldo. Aquí revisitamos las historias que heredaste, las creencias que ya no te sirven, y ordenamos la conversación interna.',
  },
  {
    numeral: 'II',
    number: '02',
    coord: '70°42′W',
    label: 'Hacer',
    subtitle: 'Qué construyes',
    short: 'Las decisiones, acciones y hábitos que estás construyendo.',
    body:
      'Cuando la mentalidad se ordena, la estrategia se vuelve simple. Presupuestos que respiran, decisiones que se sostienen, hábitos que te devuelven horas y libertad.',
  },
  {
    numeral: 'III',
    number: '03',
    coord: '∞',
    label: 'Tener',
    subtitle: 'Qué generas',
    short: 'Los resultados y recursos que estás generando y aprendiendo a administrar.',
    body:
      'Lo que se cultiva en el ser y se ordena en el hacer, se manifiesta con naturalidad en el tener. Patrimonio, tranquilidad, y la evidencia visible de una vida bien orientada.',
  },
];


// ─────────────────────────────────────────────────────────────────
// 📖 EL LIBRO
// ─────────────────────────────────────────────────────────────────
export const BOOK = {
  title: 'GPS de la Abundancia',
  subtitle: 'Ser, hacer y tener',
  author: 'Rosa Sandoval Polanco',
  year: '2026',
  edition: 'Primera edición',
  pages: 252,
  isbn: '978-9945-662-24-5',

  coverSrc: BOOK_COVER_IMAGE_PATH,
  amazonUrl: AMAZON_BOOK_LINK,
  onSale: BOOK_ON_SALE,

  tagline:
    'Una ruta para transformar tu relación con el dinero desde el SER, el HACER y el TENER.',
  thesis:
    'Hablar de dinero es hablar de historias, raíces y sueños. No de números.',
  description:
    'Una obra para quienes quieren dejar de ver el dinero desde la preocupación y comenzar a vivir tomando decisiones desde la conciencia, el propósito y la responsabilidad.',

  pillars: GPS_PILLARS,
};


// ─────────────────────────────────────────────────────────────────
// 🎙 PODCAST — Nuestro Espacio Podcast
// ─────────────────────────────────────────────────────────────────
export const PODCAST = {
  name: 'Nuestro Espacio Podcast',
  tagline: 'Conversaciones para pensar, crecer y transformar.',
  description:
    'Aquí encontrarás conversaciones, reflexiones y contenidos sobre dinero, desarrollo personal, liderazgo, propósito, emprendimiento y vida, desde una mirada práctica y cercana.',
  topics: [
    'Dinero',
    'Desarrollo personal',
    'Liderazgo',
    'Propósito',
    'Emprendimiento',
    'Vida',
  ],
  youtube: YOUTUBE_URL,
  spotify: SPOTIFY_URL,
};


// ─────────────────────────────────────────────────────────────────
// 🏢 PARA EMPRESAS
// ─────────────────────────────────────────────────────────────────
export const CORPORATE_SERVICES = [
  {
    title: 'Educación financiera y bienestar',
    body: 'Programas que mejoran la salud financiera del colaborador y, con ella, su presencia y desempeño en el trabajo.',
  },
  {
    title: 'Desarrollo personal y liderazgo',
    body: 'Formación para líderes que necesitan sostener equipos, conversaciones difíciles y decisiones bajo presión.',
  },
  {
    title: 'Trabajo en equipo',
    body: 'Dinámicas que construyen confianza, lenguaje común y corresponsabilidad entre áreas.',
  },
  {
    title: 'Ventas y desarrollo comercial',
    body: 'Metodología comercial con foco en relación, escucha y cierre consciente — no en presión.',
  },
  {
    title: 'Servicio al cliente y experiencias memorables',
    body: 'El servicio como cultura, no como protocolo. Equipos que entienden el impacto de cada interacción.',
  },
  {
    title: 'Productividad con propósito',
    body: 'Gestión del tiempo y la energía alineada a objetivos reales, sostenible en el mediano plazo.',
  },
  {
    title: 'Del bienestar a la abundancia con propósito',
    body: 'La metodología GPS de la Abundancia® adaptada al contexto organizacional: Ser, Hacer y Tener.',
  },
];

/** Formatos en que Rosa entrega los programas corporativos */
export const CORPORATE_FORMATS = [
  'Conferencias',
  'Talleres',
  'Programas formativos',
  'Cápsulas de aprendizaje',
  'Jornadas empresariales',
];


// ─────────────────────────────────────────────────────────────────
// 📝 BLOG — Taxonomía oficial
// ─────────────────────────────────────────────────────────────────
//
// Categorías = estructura principal (temática).
// Ser · Hacer · Tener = filtro secundario, NO categorías paralelas.
// (Ver "Nota de diseño" en el documento de arquitectura.)
//
export const BLOG_CATEGORIES = [
  {
    slug: 'dinero-con-proposito',
    name: 'Dinero con Propósito',
    description: 'Finanzas personales, hábitos, ahorro, deudas, inversiones, decisiones.',
  },
  {
    slug: 'desarrollo-personal',
    name: 'Desarrollo Personal',
    description: 'Mentalidad, emociones, autoestima, creencias, propósito.',
  },
  {
    slug: 'liderazgo',
    name: 'Liderazgo',
    description: 'Equipos, comunicación, relaciones y trabajo.',
  },
  {
    slug: 'empresas',
    name: 'Empresas',
    description: 'Bienestar financiero, liderazgo, ventas, servicio y desarrollo de colaboradores.',
  },
];

/** Filtro secundario de metodología — se cruza con las categorías */
export const BLOG_METHOD_TAGS = ['Ser', 'Hacer', 'Tener'];

/** Café con Rosa — sección destacada dentro del blog */
export const CAFE_CON_ROSA = {
  name: 'Café con Rosa',
  tagline: 'Reflexiones con propósito',
  description:
    'Un espacio para detenernos, mirar hacia adentro y conversar sobre esas decisiones que pueden cambiar nuestra manera de vivir, trabajar y relacionarnos.',
};


// ─────────────────────────────────────────────────────────────────
// 💬 TESTIMONIOS — Categorías oficiales
// ─────────────────────────────────────────────────────────────────
//
// Cuatro categorías para que cada visitante encuentre evidencia
// relacionada con lo que está considerando contratar.
//
export const TESTIMONIAL_CATEGORIES = [
  { slug: 'mentoria', name: 'Mentoría' },
  { slug: 'conferencias', name: 'Conferencias y talleres' },
  { slug: 'empresas', name: 'Empresas' },
  { slug: 'educacion-financiera', name: 'Educación financiera' },
];


// ─────────────────────────────────────────────────────────────────
// 🔒 LEGAL
// ─────────────────────────────────────────────────────────────────
export const LEGAL = {
  /** Año de inicio de operación del sitio, para el aviso de copyright */
  startYear: 2026,
  trademarkNotice:
    'GPS de la Abundancia® es una marca de Rosa Sandoval Polanco.',
};


// ─────────────────────────────────────────────────────────────────
// 📊 ANALÍTICA
// ─────────────────────────────────────────────────────────────────
//
// Los IDs se pegan en index.html (están comentados ahí).
// El código del sitio llama a gtag/fbq con guardas `typeof`,
// así que funciona igual si la analítica no está instalada.
//
export const ANALYTICS = {
  ga4Id: '',   // ⚠️ PENDIENTE — ej. 'G-XXXXXXXXXX'
  fbPixelId: '', // ⚠️ PENDIENTE
};
