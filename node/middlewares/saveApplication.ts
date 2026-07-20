import type { RegistrationPayload } from "../clients/registrations";
import { getAppSettingsSafe } from "../utils/getAppSettings";

export async function saveApplication(ctx: Context) {
  const {
    state: { body },
    vtex: { logger },
  } = ctx;

  // Nota: los documentos adjuntos (carnet, título, etc.) viajan solo como
  // nombres de archivo; este endpoint no recibe los binarios.
  const { recaptchaToken, ...payload } = body as RegistrationPayload & {
    recaptchaToken?: string;
  };

  const settings = await getAppSettingsSafe(ctx);

  if (!settings.registrationsApiToken) {
    logger.error({ message: "club-profesional-registrations-token-missing" });
    ctx.status = 500;
    ctx.body = {
      error: "El servicio de registro no está configurado. Contacta al administrador.",
    };
    return;
  }

  try {
    const response = await fetch("https://api.clubprofesional.com/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.registrationsApiToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      logger.error({
        message: "club-profesional-registrations-http-error",
        status: response.status,
      });
      ctx.status = 500;
      ctx.body = { error: "Error interno guardando la solicitud" };
      return;
    }

    const data = await response.json().catch(() => null);

    ctx.status = 200;
    ctx.body = { ok: true, id: data?.id ?? null };
  } catch (err) {
    // fetch solo rechaza la promesa por fallas de red/conexión (DNS, timeout,
    // conexión rechazada); los errores HTTP (4xx/5xx) ya se manejan arriba
    // con response.ok, así que si llegamos aquí es el servicio no disponible.
    logger.error({ message: "club-profesional-registrations-error", error: err });
    ctx.status = 502;
    ctx.body = {
      error: "El servicio de registro no está disponible en este momento. Intenta más tarde.",
    };
  }
}
