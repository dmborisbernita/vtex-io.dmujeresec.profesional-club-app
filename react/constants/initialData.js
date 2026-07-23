import { ACTIVIDADES_INDEPENDIENTE, ACTIVIDADES_NEGOCIO } from "./catalog";

export const INITIAL_DATA = {
  nombre: "",
  tipoId: "cedula",
  numeroId: "",
  fechaNacimiento: "",
  genero: "",
  email: "",
  telefono: "",
  provincia: "",
  ciudad: "",
  direccion: "",
  tipoSolicitud: "estudiante",
  academiaNombre: "",
  academiaDireccion: "",
  academiaTelefono: "",
  fechaGraduacion: "",
  actividadIndependiente: ACTIVIDADES_INDEPENDIENTE[0],
  negocioNombre: "",
  negocioRuc: "",
  actividadNegocio: ACTIVIDADES_NEGOCIO[0],
  documentos: [],
  consentimiento: false,
  website: "", // honeypot: debe llegar siempre vacío. Los bots suelen autocompletarlo.
};
