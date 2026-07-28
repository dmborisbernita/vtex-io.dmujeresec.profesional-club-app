import React, { useRef } from "react";
import { Landing } from "./components/Landing";
import { ClubProfesionalWizard } from "./components/wizard/ClubProfesionalWizard";

function ClubProfesional({
  heroTitle,
  heroSubtitle,
  promoTitle,
  promoText,
  infoPanelTitle,
  infoPanelText,
  infoStat1Value,
  infoStat1Label,
  infoStat2Value,
  infoStat2Label,
  infoTermsText,
  infoPolicyText,
}) {
  const formRef = useRef(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div ref={formRef} id="formulario">
        <ClubProfesionalWizard
          infoPanelTitle={infoPanelTitle}
          infoPanelText={infoPanelText}
          infoStat1Value={infoStat1Value}
          infoStat1Label={infoStat1Label}
          infoStat2Value={infoStat2Value}
          infoStat2Label={infoStat2Label}
          infoTermsText = {infoTermsText}
          infoPolicyText={infoPolicyText}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          promoText={promoText}
        />
      </div>
    </div>
  );
}

ClubProfesional.defaultProps = {
  heroTitle: "Club profesional",
  heroSubtitle:"Únete a la comunidad DMujeres",
  promoText: "Completa tu solicitud en 4 pasos y accede a beneficios exclusivos para profesionales de la belleza.",
  ...ClubProfesionalWizard.defaultProps,
};

// Respaldo del schema por si el Site Editor no toma interfaces.json (versiones antiguas del builder store).
ClubProfesional.schema = {
  title: "Club Profesional",
  type: "object",
  properties: {
    heroTitle: { title: "Título del Formulario", type: "string" },
    heroSubtitle: { title: "Subtítulo del Formulario", type: "string" },
    promoText: { title: "Texto del Formulario", type: "string" },
    infoPanelTitle: { title: "Panel info: título", type: "string" },
    infoPanelText: { title: "Panel info: descripción", type: "string" },
    infoStat1Value: { title: "Panel info: valor 1", type: "string" },
    infoStat1Label: { title: "Panel info: etiqueta 1", type: "string" },
    infoStat2Value: { title: "Panel info: valor 2", type: "string" },
    infoStat2Label: { title: "Panel info: etiqueta 2", type: "string" },
    infoTermsText: { title: "Panel info: texto de términos", type: "string" },
    infoPolicyText: { title: "Panel info: texto de política", type: "string" },
  },
};

export default ClubProfesional;
