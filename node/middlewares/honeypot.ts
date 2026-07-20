export async function honeypot(ctx: Context, next: () => Promise<any>) {
  const {
    state: { body },
    vtex: { logger },
  } = ctx;

  // "website" nunca se muestra al usuario (ver .cp-honeypot en el front).
  // Si viene con contenido, casi seguro lo llenó un bot. Respondemos 200
  // "falso" para no darle pistas de que fue detectado.
  if (body.website) {
    logger.warn({ message: "club-profesional-honeypot-triggered" });
    ctx.status = 200;
    ctx.body = { ok: true };
    return;
  }

  await next();
}
