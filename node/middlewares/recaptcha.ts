import { getAppSettingsSafe } from "../utils/getAppSettings";

const MIN_SCORE = 0.5;

export async function recaptcha(ctx: Context, next: () => Promise<any>) {
  const {
    state: { body },
    clients: { recaptcha: recaptchaClient },
    vtex: { logger },
  } = ctx;

  const settings = await getAppSettingsSafe(ctx);

  if (!settings.recaptchaSecretKey) {
    await next();
    return;
  }

  try {
    const verification = await recaptchaClient.verify(
      settings.recaptchaSecretKey,
      body.recaptchaToken
    );

    const passesScore =
      typeof verification.score !== "number" ||
      verification.score >= MIN_SCORE;

    if (!verification.success || !passesScore) {
      ctx.status = 400;
      ctx.body = {
        error: "No pudimos validar tu solicitud. Intenta de nuevo.",
      };
      return;
    }
  } catch (err) {
    logger.error({ message: "club-profesional-recaptcha-error", error: err });
    // Si el verificador falla (caído, timeout), no bloqueamos al usuario real;
    // seguimos solo con el honeypot como protección.
  }

  await next();
}
