import React from "react";
import handles from "./Landing.css";


export function Landing({ onCta, heroTitle, heroSubtitle, promoTitle, promoText }) {

  return (
    <div className={handles.landingRoot}>
      <section
        className={handles.landingPromo}
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(26,26,26,0.92), rgba(26,26,26,0.55)), url(https://placehold.co/1200x400/2A2A2A/2A2A2A?text=+)",
        }}
      >
        <div className={handles.landingPromoText}>
          <span className={handles.landingPromoKicker}>Promoción de bienvenida</span>
          <h2 className={handles.landingPromoTitle}>{promoTitle}</h2>
          <p className={handles.landingPromoCopy}>{promoText}</p>
        </div>
        <button
          type="button"
          className={`${handles.landingBtn} ${handles.landingBtnLight}`}
          onClick={onCta}
        >
          Completar solicitud
        </button>
      </section>
    </div>
  );
}
