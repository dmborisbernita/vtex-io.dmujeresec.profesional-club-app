import React from "react";
import handles from "./Landing.css";



export function Landing({ onCta, heroTitle, heroSubtitle, promoTitle, promoText }) {
  //const handles = useCssHandles(CSS_HANDLES);
  return (
    <div className={handles.landingRoot}>
      {/*<div className={handles.landingBanner}>
        <img
          src="https://placehold.co/1200x420/1A1A1A/E31C5F?font=poppins&text=Foto+de+profesionales+DMujeres"
          alt="Profesionales de belleza trabajando con productos DMujeres"
        />
      </div>*/}

      <section className={handles.landingHero}>
        <span className={handles.landingEyebrow}>Club profesional DMujeres</span>
        <h1 className={handles.landingH1}>{heroTitle}</h1>
        <p className={handles.landingLead}>{heroSubtitle}</p>
      </section>

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
