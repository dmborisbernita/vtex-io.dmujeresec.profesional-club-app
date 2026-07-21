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

    console.log("Payload to send to registrations API:", settings.registrationsApiToken);
    const data = await registrations.create(
      settings.registrationsApiToken,
      payload
    );

    console.log("Response from registrations API:", data);

    ctx.status = 200;
    ctx.body = { ok: true, id: data?.id ?? null };
  } catch (err) {
    console.log("Error from registrations API:", err);

    const { status, data: responseBody } =
      (err as { response?: { status?: number; data?: unknown } }).response ?? {};

    logger.error({
      message: "club-profesional-registrations-error",
      status,
      body: responseBody,
      error: err,
    });

    ctx.status = status ? 500 : 502;
    ctx.body = status
      ? { error: "Error interno guardando la solicitud" }
      : {
          error: "El servicio de registro no está disponible en este momento. Intenta más tarde.",
        };
  }
}
