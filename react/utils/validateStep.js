import { isValidCedula, isValidRuc, isAdult } from "./validators";

const MIN_EDAD = 18;

export function validateStep(current, data) {
  const e = {};
  if (current === 1) {
    if (!data.nombre.trim()) e.nombre = "Ingresa tu nombre completo";

    const numeroId = data.numeroId.trim();
    const esCedula = data.tipoId === "cedula";
    const longitudEsperada = esCedula ? 10 : 13;
    if (!numeroId) {
      e.numeroId = esCedula ? "Ingresa tu número de cédula" : "Ingresa tu número de RUC";
    } else if (numeroId.length !== longitudEsperada) {
      e.numeroId = esCedula
        ? "La cédula debe tener 10 dígitos"
        : "El RUC debe tener 13 dígitos";
    } else if (esCedula ? !isValidCedula(numeroId) : !isValidRuc(numeroId)) {
      e.numeroId = esCedula ? "El número de cédula no es válido" : "El número de RUC no es válido";
    }

    if (!data.fechaNacimiento) {
      e.fechaNacimiento = "Selecciona tu fecha de nacimiento";
    } else if (!isAdult(data.fechaNacimiento, MIN_EDAD)) {
      e.fechaNacimiento = `Debes ser mayor de ${MIN_EDAD} años para registrarte`;
    }

    if (!data.genero) e.genero = "Selecciona tu género";
  }
  if (current === 2) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Ingresa un correo válido";
    if (!/^[0-9]{6,10}$/.test(data.telefono)) e.telefono = "Ingresa un teléfono válido";
    if (!data.provincia) e.provincia = "Selecciona tu provincia";
    if (!data.ciudad) e.ciudad = "Selecciona tu ciudad";
    if (!data.direccion.trim()) e.direccion = "Ingresa tu dirección";
  }
  if (current === 3) {
    if (data.tipoSolicitud === "estudiante") {
      if (!data.academiaNombre.trim()) e.academiaNombre = "Ingresa el nombre de tu academia";
      if (!data.academiaTelefono.trim() || !/^[0-9]{6,10}$/.test(data.academiaTelefono))
        e.academiaTelefono = "Ingresa un teléfono válido";
      if (!data.fechaGraduacion) e.fechaGraduacion = "Selecciona la fecha de graduación";
    }
    if (data.tipoSolicitud === "propietario") {
      if (!data.negocioNombre.trim()) e.negocioNombre = "Ingresa el nombre de tu negocio";
      if (!/^[0-9]{13}$/.test(data.negocioRuc)) e.negocioRuc = "El RUC debe tener 13 dígitos";
      else if (!isValidRuc(data.negocioRuc)) e.negocioRuc = "El número de RUC no es válido";
    }
  }
  if (current === 4) {
    if (data.documentos.length === 0)
      e.documentos = "Adjunta al menos un documento";
    if (!data.consentimiento)
      e.consentimiento = "Debes aceptar el tratamiento de datos para continuar";
  }
  return e;
}
