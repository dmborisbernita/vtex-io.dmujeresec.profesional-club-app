import React from "react";
import { Sparkles } from "lucide-react";
import handles from  "./MembershipCard.css";
import { TIPO_SOLICITUD_OPTIONS } from "../constants/catalog";

function maskId(numeroId, tipoId) {
  const label = tipoId === "ruc" ? "RUC" : "C.I.";
  const digits = (numeroId || "").replace(/\D/g, "");
  if (!digits) return `${label} —`;
  if (digits.length <= 4) return `${label} ${digits}`;
  return `${label} ••••${digits.slice(-4)}`;
}

export function MembershipCard({ data, progress }) {

  const tipoInfo = TIPO_SOLICITUD_OPTIONS.find((t) => t.value === data.tipoSolicitud);
  const TipoIcon = tipoInfo ? tipoInfo.icon : Sparkles;
  return (
    <div className={handles.card}>
      <div className={handles.cardPattern} aria-hidden="true" />

      <div className={handles.cardRow}>
        <div className={handles.cardBrandGroup}>
          <span className={handles.cardBrand}>DMujeres</span>
          <span className={handles.cardKicker}>Club profesional</span>
        </div>
        <div className={handles.cardBadge}>
          <TipoIcon size={14} strokeWidth={1.8} />
          <span>{tipoInfo ? tipoInfo.label : "Profesional"}</span>
        </div>
      </div>

      <div className={handles.cardRow}>
        <div className={handles.cardNameGroup}>
          <span className={handles.cardNameLabel}>Titular</span>
          <span className={handles.cardName}>{data.nombre.trim() || "Tu nombre aquí"}</span>
        </div>
        <div className={handles.cardMiniGroup}>
          <div>
            <span className={handles.cardMiniLabel}>Ciudad</span>
            <span className={handles.cardMiniValue}>{data.ciudad || "—"}</span>
          </div>
          <div>
            <span className={handles.cardMiniLabel}>Identificación</span>
            <span className={handles.cardMiniValue}>{maskId(data.numeroId, data.tipoId)}</span>
          </div>
        </div>
      </div>

      <div className={handles.cardStrip}>
        <div className={handles.cardStripFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
