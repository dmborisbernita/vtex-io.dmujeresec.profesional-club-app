import { json } from "co-body";

export async function parseBody(ctx: Context, next: () => Promise<any>) {
  console.log("parseBody middleware");
  ctx.state.body = await json(ctx.req);

  await next();
}
