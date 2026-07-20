import { getAppSettingsSafe } from "../utils/getAppSettings";

export async function config(ctx: Context, next: () => Promise<any>) {
  ctx.set("Content-Type", "application/json");
  ctx.status = 200;

  const settings = await getAppSettingsSafe(ctx);

  // OJO: nunca devolver recaptchaSecretKey aquí, esa se queda en el backend.
  ctx.body = { recaptchaSiteKey: settings.recaptchaSiteKey || null };

  await next();
}
