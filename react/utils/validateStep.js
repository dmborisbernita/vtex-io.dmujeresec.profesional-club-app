export function validateStep(current, data) {
  const e = {};
  if (current === 1) {
    if (!data.nombre.trim()) e.nombre = "Ingresa tu nombre completo";
    if (!data.numeroId.trim())
      e.numeroId = data.tipoId === "cedula" ? "Ingresa tu número de cédula" : "Ingresa tu número de RUC";
    else if (!/^[0-9]{6,13}$/.test(data.numeroId.trim()))
      e.numeroId = "Verifica el número ingresado";
    if (!data.fechaNacimiento) e.fechaNacimiento = "Selecciona tu fecha de nacimiento";
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
    }
  }
  if (current === 4) {
    if (data.tipoSolicitud !== "propietario" && data.documentos.length === 0)
      e.documentos = "Adjunta al menos un documento";
  }
  return e;
}
