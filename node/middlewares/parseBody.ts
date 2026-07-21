import { json } from "co-body";

export async function parseBody(ctx: Context, next: () => Promise<any>) {
  ctx.state.body = await json(ctx.req, { limit: "20mb" });

  await next();
}
