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
  benefits,
  infoPolicyText,
}) {
  const formRef = useRef(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
  {/*     <Landing
        onCta={scrollToForm}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        promoTitle={promoTitle}
        promoText={promoText}
      /> */}
      <div ref={formRef} id="formulario">
        <ClubProfesionalWizard
          infoPanelTitle={infoPanelTitle}
          infoPanelText={infoPanelText}
          infoStat1Value={infoStat1Value}
          infoStat1Label={infoStat1Label}
          infoStat2Value={infoStat2Value}
          infoStat2Label={infoStat2Label}
          benefits={benefits}
          infoPolicyText={infoPolicyText}
        />
      </div>
    </div>
  );
}

ClubProfesional.defaultProps = {
  heroTitle: "Hablemos de ti. Hablemos de tu cuenta profesional.",
  heroSubtitle:
    "Creamos el Club Profesional para estudiantes e independientes que viven de la belleza: precios especiales y beneficios pensados para tu día a día.",
  promoTitle: "20% adicional en tu primera compra profesional",
  promoText: "Válido para cuentas nuevas aprobadas este mes.",
  ...ClubProfesionalWizard.defaultProps,
};

// Respaldo del schema por si el Site Editor no toma interfaces.json (versiones antiguas del builder store).
ClubProfesional.schema = {
  title: "Club Profesional",
  type: "object",
  properties: {
    heroTitle: { title: "Título principal", type: "string" },
    heroSubtitle: { title: "Subtítulo", type: "string" },
    promoTitle: { title: "Título de la promoción", type: "string" },
    promoText: { title: "Texto de la promoción", type: "string" },
    infoPanelTitle: { title: "Panel info: título", type: "string" },
    infoPanelText: { title: "Panel info: descripción", type: "string" },
    infoStat1Value: { title: "Panel info: valor tiempo de respuesta", type: "string" },
    infoStat1Label: { title: "Panel info: etiqueta tiempo de respuesta", type: "string" },
    infoStat2Value: { title: "Panel info: valor documentos", type: "string" },
    infoStat2Label: { title: "Panel info: etiqueta documentos", type: "string" },
    benefits: {
      title: "Panel info: beneficios",
      type: "array",
      items: { type: "string" },
    },
    infoPolicyText: { title: "Panel info: texto de política", type: "string" },
  },
};

export default ClubProfesional;
