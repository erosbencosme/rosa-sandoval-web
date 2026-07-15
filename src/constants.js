// ================================================================
// ROSA SANDOVAL — CONSTANTES CENTRALIZADAS DE PRODUCCIÓN
// ================================================================
//
// 🎯 INSTRUCCIONES: Edita SOLO los valores de abajo.
//    Todo el sitio web se actualiza automáticamente.
//    No necesitas tocar ningún otro archivo.
//
// 📦 DESPLIEGUE: Después de editar, ejecuta:
//    npm run build → sube la carpeta "dist/" a GitHub Pages.
//
// ================================================================


// ─────────────────────────────────────────────────────────────────
// 🔗 ENLACES PRINCIPALES — Edita estos valores para producción
// ─────────────────────────────────────────────────────────────────

/**
 * AMAZON_BOOK_LINK — URL directa para comprar el libro en Amazon.
 * ⚠️ REEMPLAZA con tu enlace real cuando el libro esté publicado.
 *    Ejemplo: 'https://www.amazon.com/dp/B0XXXXXXXXX'
 */
export const AMAZON_BOOK_LINK = 'https://www.amazon.com/dp/YOUR_BOOK_ASIN';

/**
 * BOOK_COVER_IMAGE_PATH — Ruta a la portada real del libro.
 * El archivo debe estar en: public/images/book-cover.jpg
 * En producción (GitHub Pages), Vite resuelve esta ruta automáticamente.
 */
export const BOOK_COVER_IMAGE_PATH = './images/book-cover.jpg';

/**
 * CONTACT_FORM_ENDPOINT — Endpoint del formulario de contacto.
 * ⚠️ REEMPLAZA con tu endpoint real de Formspree o Web3Forms.
 *    Ejemplo Formspree:  'https://formspree.io/f/xbldpypg'
 *    Ejemplo Web3Forms:  'https://api.web3forms.com/submit'
 */
export const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xbldpypg';


// ─────────────────────────────────────────────────────────────────
// 📱 REDES SOCIALES Y CONTACTO
// ─────────────────────────────────────────────────────────────────

/** Google Form para agendar sesión de claridad */
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScqF597Q6Zckyk9ZWpUu5sl5Gdj-IZvBtNw7S5P8m8UMV4NFA/viewform';

/** WhatsApp — número sin '+' ni guiones */
export const WHATSAPP_NUMBER = '18494720939';
export const WHATSAPP_MESSAGE = '¡Hola Rosa! Me interesa conocer más sobre tus servicios de coaching financiero. 🌟';

/** Canal de YouTube */
export const YOUTUBE_URL = 'https://www.youtube.com/@NuestroEspacioPodcast-h3w/videos';

/** Próxima formación (fecha para countdown) */
export const NEXT_COURSE_DATE = '2026-04-01T00:00:00';

/**
 * Google Apps Script URL (pega la URL cuando publiques el script).
 * Se usa opcionalmente para enviar leads a Google Sheets.
 */
export const GOOGLE_SCRIPT_URL = '';

/** Redes sociales — enlaces directos */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/rosasandovalp',
  youtube: 'https://www.youtube.com/@NuestroEspacioPodcast-h3w/videos',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};


// ─────────────────────────────────────────────────────────────────
// 📖 EL LIBRO — Configuración centralizada
// ─────────────────────────────────────────────────────────────────
//
// Cambia estos valores y todo el landing + la página del libro
// se actualiza automáticamente. Ideal para actualizar ISBN,
// número de páginas, año, etc.
//
export const BOOK = {
  title: 'Método GPS',
  subtitle: 'Ser, hacer y tener',
  author: 'Rosa Sandoval',
  year: '2026',
  edition: 'Primera edición',
  pages: 240,
  isbn: '979-8-000000-00-0',

  // Portada — usa la constante centralizada arriba
  coverSrc: BOOK_COVER_IMAGE_PATH,

  // Amazon — usa la constante centralizada arriba
  amazonUrl: AMAZON_BOOK_LINK,

  // Copy editorial
  tagline: 'Un mapa interior hacia la libertad financiera.',
  thesis:
    'Hablar de dinero es hablar de historias, raíces y sueños. No de números.',

  // Pilares del Método GPS — tres coordenadas del libro
  pillars: [
    {
      numeral: 'I',
      coord: '18°28′N',
      label: 'Ser',
      subtitle: 'Raíces & mentalidad',
      body:
        'Tu relación con el dinero comenzó mucho antes de tu primer sueldo. Aquí revisitamos las historias que heredaste, las creencias que ya no te sirven, y ordenamos la conversación interna.',
    },
    {
      numeral: 'II',
      coord: '70°42′W',
      label: 'Hacer',
      subtitle: 'Disciplina & estrategia',
      body:
        'Cuando la mentalidad se ordena, la estrategia se vuelve simple. Presupuestos que respiran, decisiones que se sostienen, hábitos que te devuelven horas y libertad.',
    },
    {
      numeral: 'III',
      coord: '∞',
      label: 'Tener',
      subtitle: 'Abundancia manifiesta',
      body:
        'Lo que se cultiva en el ser y se ordena en el hacer, se manifiesta con naturalidad en el tener. Patrimonio, tranquilidad, y la evidencia visible de una vida bien orientada.',
    },
  ],
};


// ─────────────────────────────────────────────────────────────────
// 🔒 NOTAS DE SEGURIDAD — Row Level Security (RLS)
// ─────────────────────────────────────────────────────────────────
//
// Si usas Supabase para almacenar los leads del formulario,
// ACTIVA Row Level Security (RLS) en la tabla 'leads':
//
//   -- 1. Habilitar RLS en la tabla
//   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
//
//   -- 2. Permitir INSERT solo para usuarios anónimos/públicos
//   CREATE POLICY "allow_anon_insert"
//     ON leads FOR INSERT
//     TO anon
//     WITH CHECK (true);
//
//   -- 3. DENEGAR lectura, actualización y eliminación a anónimos
//   --    (No crear políticas SELECT/UPDATE/DELETE para 'anon')
//   --    Solo los usuarios autenticados (dashboard admin) podrán ver datos.
//
// Esto asegura que visitantes maliciosos NO puedan descargar
// tu base de datos de clientes vía la API pública de Supabase.
// ─────────────────────────────────────────────────────────────────
