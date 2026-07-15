/**
 * ================================================================
 * GOOGLE APPS SCRIPT — Rosa Sandoval Lead Capture
 * ================================================================
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega TODO este código
 * 4. Ve a Implementar → Nueva implementación
 * 5. Tipo: App web
 * 6. Ejecutar como: Yo (tu cuenta)
 * 7. Acceso: Cualquier persona
 * 8. Copia la URL generada
 * 9. Pégala en src/components/Formulario.jsx → GOOGLE_SCRIPT_URL
 * 
 * ================================================================
 */

// ID de tu Google Sheet (créala primero y copia el ID de la URL)
// URL: https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
const SHEET_ID = 'TU_SHEET_ID_AQUI';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Si la hoja no existe, crearla con encabezados
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.appendRow(['Timestamp', 'Nombre', 'Email', 'Teléfono', 'Mensaje', 'Fuente']);
      newSheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.nombre || '',
        data.email || '',
        data.telefono || '',
        data.mensaje || '',
        'Web Form'
      ]);
    } else {
      // Si no tiene encabezados, agregarlos
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'Nombre', 'Email', 'Teléfono', 'Mensaje', 'Fuente']);
      }
      
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.nombre || '',
        data.email || '',
        data.telefono || '',
        data.mensaje || '',
        'Web Form'
      ]);
    }
    
    // Enviar email de notificación (opcional)
    // MailApp.sendEmail({
    //   to: 'tu@email.com',
    //   subject: '🔥 Nuevo Lead: ' + (data.nombre || 'Sin nombre'),
    //   body: `
    //     Nuevo lead desde la web:
    //     
    //     Nombre: ${data.nombre}
    //     Email: ${data.email}
    //     Teléfono: ${data.telefono}
    //     Mensaje: ${data.mensaje}
    //     Fecha: ${data.timestamp}
    //   `
    // });
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Rosa Sandoval Lead API activa' }))
    .setMimeType(ContentService.MimeType.JSON);
}
