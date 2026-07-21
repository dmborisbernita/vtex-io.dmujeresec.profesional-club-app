import type { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";

export interface RegistrationPayload {
  tipoSolicitud: string;
  nombre: string;
  tipoId: string;
  numeroId: string;
  fechaNacimiento: string;
  genero: string;
  email: string;
  telefono: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  website: string;
  academiaNombre?: string;
  academiaDireccion?: string;
  academiaTelefono?: string;
  fechaGraduacion?: string;
  negocioNombre?: string;
  negocioRuc?: string;
  actividadIndependiente?: string;
  actividadNegocio?: string;
  documentos: Array<{ nombre: string; contenido: string }>;
}

interface RegistrationResponse {
  id?: number | string;
  [key: string]: unknown;
}

export class RegistrationsClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super("http://api.dmujeres.ec", context, options);
  }

  public create(token: string, payload: RegistrationPayload) {
    return this.http.post<RegistrationResponse>(
      "/v2/registrations/",
      payload,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
