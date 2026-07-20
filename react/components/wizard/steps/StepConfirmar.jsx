import React from "react";
import { Upload, FileText } from "lucide-react";
import handles from "./Step.css";
import { Field } from "../../fields";
import { TIPO_SOLICITUD_OPTIONS } from "../../../constants/catalog";

export function StepConfirmar({ data, errors, update, requiresDocs, docHint }) {
  
  return (
    <div className={handles.stepContent}>
      {requiresDocs && (
        <Field label="Documentos de respaldo" required hint={docHint} error={errors.documentos}>
          <label className={handles.fileDrop} htmlFor="cp-file">
            <Upload size={18} strokeWidth={1.7} />
            <span>Arrastra tus archivos o haz clic para seleccionarlos</span>
          </label>
          <input
            id="cp-file"
            type="file"
            multiple
            className={handles.fileInput}
            onChange={(e) => update("documentos", Array.from(e.target.files))}
          />
          {data.documentos.length > 0 && (
            <ul className={handles.fileList}>
              {data.documentos.map((f, i) => (
                <li key={i}><FileText size={14} strokeWidth={1.7} /> {f.name}</li>
              ))}
            </ul>
          )}
        </Field>
      )}

      <div className={handles.summary}>
        <span className={handles.summaryTitle}>Revisa tu solicitud</span>
        <dl>
          <div><dt>Nombre</dt><dd>{data.nombre || "—"}</dd></div>
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
