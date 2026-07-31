import { EXT_TO_MIME, ALL_ALLOWED_EXTENSIONS, MAX_TOTAL_DOCUMENTOS_BYTES } from "../constants/uploads";

// El perfil "propietario"/negocio solo admite PDF (regla de negocio ya
// existente: certificado de RUC), el resto admite imagen o PDF.
export function getAllowedExtensions(tipoSolicitud) {
  return tipoSolicitud === "propietario" ? ["pdf"] : ALL_ALLOWED_EXTENSIONS;
}

function getExtension(filename) {
  const parts = String(filename || "").split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

export function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

// Valida un único archivo: extensión permitida y, si el navegador reportó un
// MIME type, que coincida con lo esperado para esa extensión. Esto es una
// validación de UX, no de seguridad -- se puede saltar pegándole directo a
// la API, por eso el backend valida el contenido real (magic bytes) además.
export function validateFile(file, allowedExtensions) {
  const ext = getExtension(file.name);
  if (!allowedExtensions.includes(ext)) {
    return `"${file.name}" no es un tipo de archivo permitido (solo ${allowedExtensions
      .map((e) => e.toUpperCase())
      .join(", ")}).`;
  }

  const expectedMime = EXT_TO_MIME[ext];
  if (file.type && expectedMime && file.type !== expectedMime) {
    return `"${file.name}" no parece ser un archivo ${ext.toUpperCase()} válido.`;
  }

  return null;
}

// Valida un lote completo de documentos (extensión/tipo de cada uno + peso
// total). Se usa tanto al seleccionar archivos (StepConfirmar) como en la
// validación del paso 4 (validateStep) como red de seguridad adicional.
export function validateDocumentos(files, tipoSolicitud) {
  const allowedExtensions = getAllowedExtensions(tipoSolicitud);

  for (const file of files) {
    const reason = validateFile(file, allowedExtensions);
    if (reason) return reason;
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_DOCUMENTOS_BYTES) {
    return `El total de documentos (${formatMB(totalBytes)} MB) supera el máximo permitido de ${formatMB(
      MAX_TOTAL_DOCUMENTOS_BYTES
    )} MB. Reduce el tamaño o la cantidad de archivos.`;
  }

  return null;
}
