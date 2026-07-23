// Validaciones de documentos de identidad ecuatorianos (cédula y RUC).
// Referencia: algoritmo módulo 10 (persona natural) y módulo 11 (sociedades).

function isValidProvinceCode(numero) {
  const provincia = parseInt(numero.slice(0, 2), 10);
  return provincia >= 1 && provincia <= 24;
}

function isValidTercerDigito(numero, max) {
  const tercerDigito = parseInt(numero[2], 10);
  return tercerDigito <= max;
}

// Módulo 10, usado para cédula y para RUC de persona natural (tercer dígito 0-5).
function isValidCedulaDigits(numero) {
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digitoVerificador = parseInt(numero[9], 10);
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = parseInt(numero[i], 10) * coeficientes[i];
    if (valor > 9) valor -= 9;
    suma += valor;
  }
  const verificador = (10 - (suma % 10)) % 10;
  return verificador === digitoVerificador;
}

export function isValidCedula(numero) {
  if (!/^[0-9]{10}$/.test(numero)) return false;
  if (!isValidProvinceCode(numero)) return false;
  if (!isValidTercerDigito(numero, 5)) return false;
  return isValidCedulaDigits(numero);
}

// Módulo 11, usado para RUC de sociedades públicas (tercer dígito 6) y privadas (tercer dígito 9).
function isValidModulo11(numero, coeficientes, digitoVerificadorIndex) {
  const digitoVerificador = parseInt(numero[digitoVerificadorIndex], 10);
  let suma = 0;
  for (let i = 0; i < coeficientes.length; i++) {
    suma += parseInt(numero[i], 10) * coeficientes[i];
  }
  const residuo = suma % 11;
  let verificador = residuo === 0 ? 0 : 11 - residuo;
  if (verificador === 10) return false;
  return verificador === digitoVerificador;
}

export function isValidRuc(numero) {
  if (!/^[0-9]{13}$/.test(numero)) return false;
  if (!isValidProvinceCode(numero)) return false;

  const tercerDigito = parseInt(numero[2], 10);

  if (tercerDigito <= 5) {
    // RUC de persona natural: cédula (10 dígitos) + código de establecimiento (3 dígitos, >= 001).
    if (!isValidCedulaDigits(numero)) return false;
    return /^0*[1-9][0-9]*$/.test(numero.slice(10));
  }

  if (tercerDigito === 6) {
    // RUC de sociedad/entidad pública.
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
    if (!isValidModulo11(numero, coeficientes, 8)) return false;
    return /^0*[1-9][0-9]*$/.test(numero.slice(9));
  }

  if (tercerDigito === 9) {
    // RUC de sociedad privada.
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    if (!isValidModulo11(numero, coeficientes, 9)) return false;
    return /^0*[1-9][0-9]*$/.test(numero.slice(10));
  }

  return false;
}

export function isAdult(fechaNacimiento, minAge = 18) {
  if (!fechaNacimiento) return false;
  const nacimiento = new Date(fechaNacimiento + "T00:00:00");
  if (Number.isNaN(nacimiento.getTime())) return false;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const aunNoCumple =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (aunNoCumple) edad--;

  return edad >= minAge;
}
