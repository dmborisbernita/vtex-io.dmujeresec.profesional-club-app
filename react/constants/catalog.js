import { GraduationCap, UserCheck, Building2 } from "lucide-react";

export const ACTIVIDADES_INDEPENDIENTE = [
  "Maquillador/a", "Técnico/a capilar", "Técnico/a en uñas",
  "Técnico/a integral", "Especialista en cuidado de la piel", "Barbero/a",
];

export const ACTIVIDADES_NEGOCIO = [
  "Barbería", "Peluquería", "Estudio de maquillaje", "Salón de uñas", "Centro estético",
];

export const TIPO_SOLICITUD_OPTIONS = [
  { value: "estudiante", label: "Estudiante", icon: GraduationCap, desc: "Estás formándote en una academia" },
  { value: "independiente", label: "Independiente", icon: UserCheck, desc: "Ejerces por tu cuenta" },
  { value: "propietario", label: "Propietario/a", icon: Building2, desc: "Tienes un negocio de belleza" },
];

export const STEPS = [
  { id: 1, label: "Identidad" },
  { id: 2, label: "Contacto" },
  { id: 3, label: "Perfil profesional" },
  { id: 4, label: "Confirmar" },
];

export const STEP_INFO = {
  1: "Usamos estos datos para verificar tu identidad y evitar registros duplicados.",
  2: "Te contactaremos por estos medios para validar tu cuenta y avisarte de tus beneficios.",
  3: "Esta información nos permite asignarte los beneficios correctos según tu actividad profesional.",
  4: "Revisa que todo esté correcto. Tus documentos solo se usan para validar tu perfil profesional.",
};

export const DOC_OPTIONS_BY_TIPO = {
  estudiante: [
    "Carnet de estudiante",
    "Certificado de la academia",
    "Última factura o recibo de pago",
  ],
  independiente: [
    "JDNA vigente",
    "Certificación emitida por el Ministerio de Trabajo",
    "Título profesional en belleza o ramas afines",
    "Título de artesano",
  ],
  propietario: [
    "PDF del RUC asociado a labores afines a la belleza",
  ],
};
