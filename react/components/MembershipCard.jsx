import React from "react";
import { Sparkles } from "lucide-react";
import handles from  "./MembershipCard.css";
import { TIPO_SOLICITUD_OPTIONS } from "../constants/catalog";


export function MembershipCard({ data, progress, memberCode }) {
  
  const tipoInfo = TIPO_SOLICITUD_OPTIONS.find((t) => t.value === data.tipoSolicitud);
  const TipoIcon = tipoInfo ? tipoInfo.icon : Sparkles;
  return (
    <div className={handles.card}>
      <div className={handles.cardPattern} aria-hidden="true" />
      <div className={handles.cardTop}>
        <span className={handles.cardBrand}>DMujeres</span>
        <span className={handles.cardKicker}>Club profesional</span>
      </div>

      <div className={handles.cardBody}>
        <span className={handles.cardNameLabel}>Titular</span>
        <span className={handles.cardName}>{data.nombre.trim() || "Tu nombre aquí"}</span>

        <div className={handles.cardBadge}>
          <TipoIcon size={15} strokeWidth={1.8} />
          <span>{tipoInfo ? tipoInfo.label : "Profesional"}</span>
        </div>
      </div>

      <div className={handles.cardBottom}>
        <div>
          <span className={handles.cardMiniLabel}>Ciudad</span>
          <span className={handles.cardMiniValue}>{data.ciudad || "—"}</span>
        </div>
        <div>
          <span className={handles.cardMiniLabel}>N.º de socio</span>
          <span className={handles.cardMiniValue}>{memberCode}</span>
        </div>
      </div>

      <div className={handles.cardStrip}>
        <div className={handles.cardStripFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
