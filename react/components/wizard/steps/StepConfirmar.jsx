import React, { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import handles from "./Step.css";
import { Field } from "../../fields";
import { TIPO_SOLICITUD_OPTIONS } from "../../../constants/catalog";
import { MAX_TOTAL_DOCUMENTOS_BYTES } from "../../../constants/uploads";
import { getAllowedExtensions, validateDocumentos, formatMB } from "../../../utils/uploadValidation";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function StepConfirmar({ data, errors, update, docOptions }) {
  const [fileError, setFileError] = useState(null);
  const allowedExtensions = getAllowedExtensions(data.tipoSolicitud);
  const accept = allowedExtensions.map((ext) => `.${ext}`).join(",");

  function handleFileChange(e) {
    const incoming = Array.from(e.target.files);
    const error = validateDocumentos(incoming, data.tipoSolicitud);
    if (error) {
      setFileError(error);
    } else {
      setFileError(null);
      update("documentos", incoming);
    }
    // Permite volver a elegir el mismo archivo (ya corregido) sin que el
    // navegador ignore el cambio por ser "la misma" selección.
    e.target.value = "";
  }

  function removeDocumento(index) {
    update("documentos", data.documentos.filter((_, i) => i !== index));
    setFileError(null);
  }

  return (
    <div className={handles.stepContent}>
      <Field
        label="Documentos de respaldo"
        required
        error={fileError || errors.documentos}
        hint={`Formatos permitidos: ${allowedExtensions.map((e) => e.toUpperCase()).join(", ")} · Máximo ${formatMB(MAX_TOTAL_DOCUMENTOS_BYTES)} MB en total`}
      >
        {docOptions && (
          <div className={handles.docOptionsBox}>
            <span className={handles.docOptionsTitle}>
              Sube al menos uno de estos documentos:
            </span>
            <ul className={handles.docOptions}>
              {docOptions.map((opt) => <li key={opt}>{opt}</li>)}
            </ul>
          </div>
        )}

        <label className={handles.fileDrop} htmlFor="cp-file">
          <Upload size={18} strokeWidth={1.7} />
          <span>Arrastra tus archivos o haz clic para seleccionarlos</span>
        </label>
        <input
          id="cp-file"
          type="file"
          multiple
          accept={accept}
          className={handles.fileInput}
          onChange={handleFileChange}
        />
        {data.documentos.length > 0 && (
          <ul className={handles.fileList}>
            {data.documentos.map((f, i) => (
              <li key={i} className={handles.fileItem}>
                <FileText size={14} strokeWidth={1.7} />
                <span className={handles.fileName}>{f.name}</span>
                <span className={handles.fileSize}>{formatSize(f.size)}</span>
                <button
                  type="button"
                  className={handles.fileRemove}
                  onClick={() => removeDocumento(i)}
                  aria-label={`Quitar ${f.name}`}
                >
                  <X size={14} strokeWidth={1.8} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Field>

      <div className={handles.summary}>
        <span className={handles.summaryTitle}>Revisa tu solicitud</span>
        <dl>
          <div><dt>Nombre</dt><dd>{[data.nombres, data.apellidos].filter(Boolean).join(" ") || "—"}</dd></div>
          <div><dt>Identificación</dt><dd>{data.numeroId || "—"}</dd></div>
          <div><dt>Correo</dt><dd>{data.email || "—"}</dd></div>
          <div><dt>Teléfono</dt><dd>{data.telefono || "—"}</dd></div>
          <div><dt>Ubicación</dt><dd>{[data.ciudad, data.provincia].filter(Boolean).join(", ") || "—"}</dd></div>
          <div><dt>Perfil</dt><dd>{TIPO_SOLICITUD_OPTIONS.find((t) => t.value === data.tipoSolicitud)?.label}</dd></div>
        </dl>
      </div>
    </div>
  );
}
