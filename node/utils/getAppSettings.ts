import { APP } from "@vtex/api";

import { FALLBACK_SETTINGS } from "../constants/settings";

type AppSettings = typeof FALLBACK_SETTINGS;

// Envuelve apps.getAppSettings con un fallback a constantes locales: si la
// plataforma sigue rechazando la llamada (ver incidente Authorization
// Engine), la app sigue funcionando en vez de tumbar cada request.
// Si el valor real sí llega (total o parcialmente), ese manda sobre el fallback.
export async function getAppSettingsSafe(ctx: Context): Promise<AppSettings> {
  let settings: Partial<AppSettings> = {};

  try {
    settings = await ctx.clients.apps.getAppSettings(APP.ID);
  } catch (err) {
    ctx.vtex.logger.error({
      message: "club-profesional-settings-fallback",
      error: err,
    });
  }

  return {
    recaptchaSiteKey: settings.recaptchaSiteKey || FALLBACK_SETTINGS.recaptchaSiteKey,
    recaptchaSecretKey: settings.recaptchaSecretKey || FALLBACK_SETTINGS.recaptchaSecretKey,
    registrationsApiToken: settings.registrationsApiToken || FALLBACK_SETTINGS.registrationsApiToken,
  };
}
