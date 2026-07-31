// 1.5 MB crudos totales: el backend Django no tiene configurado
// DATA_UPLOAD_MAX_MEMORY_SIZE (default 2.5MB para todo el request), y los
// documentos viajan en base64 dentro del mismo JSON (~33% más pesado que el
// archivo original) junto al resto de los campos. Este límite deja margen
// real por debajo de ese techo.
export const MAX_TOTAL_DOCUMENTOS_BYTES = 1.5 * 1024 * 1024;

export const EXT_TO_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

export const ALL_ALLOWED_EXTENSIONS = Object.keys(EXT_TO_MIME);
