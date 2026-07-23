import type { RegistrationPayload } from "../clients/registrations";
import { getAppSettingsSafe } from "../utils/getAppSettings";

export async function saveApplication(ctx: Context) {
  const {
    state: { body },
    clients: { registrations },
    vtex: { logger },
  } = ctx;

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

    const data = await registrations.create(
      settings.registrationsApiToken,
      payload
    );

    //console.log("Response from registrations API:", data);

    ctx.status = 200;
    ctx.body = { ok: true, id: data?.id ?? null };
  } catch (err) {
    //console.log("Error from registrations API:", err);

    const { status, data: responseBody } =
      (err as { response?: { status?: number; data?: unknown } }).response ?? {};

    logger.error({
      message: "club-profesional-registrations-error",
      status,
      body: responseBody,
      error: err,
    });

    if (status === 409) {
      // Caso de negocio esperado (ya existe una solicitud activa): este sí debe
      // mostrarse al cliente, a diferencia de los errores técnicos de abajo.
      ctx.status = 409;
      ctx.body = {
        error:
          "Ya tienes una solicitud en proceso con esta identificación.",
      };
      return;
    }

    ctx.status = status ? 500 : 502;
    // El mensaje que ve el cliente sigue siendo genérico a propósito; backendStatus/
    // backendDetail son solo para inspección técnica (logs, pestaña Network), no se
    // muestran en la UI.
    ctx.body = status
      ? {
          error: "Error interno guardando la solicitud",
          backendStatus: status,
          backendDetail: responseBody,
        }
      : {
          error: "El servicio de registro no está disponible en este momento. Intenta más tarde.",
        };
  }
}
