import React from "react";
import {
  User,
  GraduationCap,
  Monitor,
  CheckCircle,
  Phone,
  ShieldCheck,
  FileText,
  Smartphone,
  Briefcase,
  Package,
  CreditCard,
  Calendar,
  ClipboardCheck,
  Mail,
  MapPin,
  Camera,
} from "lucide-react";
import handles from "./HowItWorks.css";

const ICONS = {
  user: User,
  "graduation-cap": GraduationCap,
  monitor: Monitor,
  "check-circle": CheckCircle,
  phone: Phone,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  smartphone: Smartphone,
  briefcase: Briefcase,
  package: Package,
  "credit-card": CreditCard,
  calendar: Calendar,
  "clipboard-check": ClipboardCheck,
  mail: Mail,
  "map-pin": MapPin,
  camera: Camera,
};

const ICON_KEYS = Object.keys(ICONS);

function HowItWorks({ title, steps }) {
  const list = Array.isArray(steps) ? steps : [];

  return (
    <section className={handles.howItWorksRoot}>
      {title ? (
        <h2 className={handles.howItWorksTitle}>
          <span className={handles.howItWorksTitleText}>{title}</span>
        </h2>
      ) : null}

      <div className={handles.howItWorksGrid}>
        {list.map((step, i) => {
          const Icon = ICONS[step.icon] || User;
          const isLast = i === list.length - 1;
          return (
            <React.Fragment key={i}>
              <div className={handles.howItWorksStep}>
                <div className={handles.howItWorksIconWrap}>
                  <Icon
                    className={handles.howItWorksIcon}
                    size={26}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <p className={handles.howItWorksLine1}>{step.line1}</p>
                <p className={handles.howItWorksLine2}>{step.line2}</p>
              </div>
              {!isLast ? (
                <div className={handles.howItWorksConnector} aria-hidden="true" />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

HowItWorks.defaultProps = {
  title: "¿Cómo funciona?",
  steps: [
    {
      icon: "user",
      line1: "Completa tus datos",
      line2: "Ingresa tu información personal y de contacto.",
    },
    {
      icon: "graduation-cap",
      line1: "Cuéntanos tu perfil",
      line2: "Indica tu actividad profesional y datos de tu negocio.",
    },
    {
      icon: "monitor",
      line1: "Validamos tu información",
      line2: "Revisamos tus datos para confirmar tu perfil profesional.",
    },
    {
      icon: "check-circle",
      line1: "Activas tu membresía",
      line2: "Recibe tu confirmación y comienza a disfrutar de tus beneficios.",
    },
  ],
};

// Respaldo del schema por si el Site Editor no toma interfaces.json (versiones antiguas del builder store).
HowItWorks.schema = {
  title: "Cómo funciona (pasos)",
  type: "object",
  properties: {
    title: { title: "Título de la sección", type: "string" },
    steps: {
      title: "Pasos",
      type: "array",
      items: {
        title: "Paso",
        type: "object",
        properties: {
          icon: {
            title: "Ícono",
            type: "string",
            enum: ICON_KEYS,
            default: "user",
          },
          line1: { title: "Texto línea 1", type: "string" },
          line2: { title: "Texto línea 2", type: "string" },
        },
      },
    },
  },
};

export default HowItWorks;
