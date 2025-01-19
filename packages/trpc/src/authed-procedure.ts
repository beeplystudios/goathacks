import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./trpc";
import {} from "hono";

export const authedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { isSignedIn, toAuth } = await ctx.clerk.authenticateRequest(
    ctx.honoCtx.req.raw
  );

  if (!isSignedIn) throw new TRPCError({ code: "UNAUTHORIZED" });

  const user = await ctx.clerk.users.getUser(toAuth().userId);

  return next({
    ctx: {
      user,
    },
  });
});
