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
