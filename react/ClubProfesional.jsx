import React, { useRef } from "react";
import { Landing } from "./components/Landing";
import { ClubProfesionalWizard } from "./components/wizard/ClubProfesionalWizard";

function ClubProfesional({ heroTitle, heroSubtitle, promoTitle, promoText }) {
  const formRef = useRef(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <Landing
        onCta={scrollToForm}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        promoTitle={promoTitle}
        promoText={promoText}
      />
      <div ref={formRef} id="formulario">
        <ClubProfesionalWizard />
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
  },
};

export default ClubProfesional;
