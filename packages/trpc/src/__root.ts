import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { route } from "@goathacks/db/schema";
import { TRPCError } from "@trpc/server";
import { getDirections } from "./get-directions";
import { authedProcedure } from "./authed-procedure";

export const appRouter = router({
  test: authedProcedure.query(({ ctx }) => ctx.user.fullName),
  route: {
    get: publicProcedure
      .input(z.object({ routeId: z.string() }))
      .query(async ({ ctx, input }) => {
        const query = await ctx.db.query.route.findFirst({
          where: eq(route.id, input.routeId),
          with: {
            stops: {
              columns: {
                id: true,
                name: true,
                lat: true,
                lon: true,
              },
            },
          },
        });

        if (!query) throw new TRPCError({ code: "NOT_FOUND" });

        return query;
      }),

    getRouteInstructions: publicProcedure
      .input(
        z.object({
          origin: z.object({ lat: z.number(), lon: z.number() }),
          dest: z.object({ lat: z.number(), lon: z.number() }),
        })
      )
      .query(async ({ input }) => {
        console.log("FETCHING");
        const data = await getDirections(input.origin, input.dest);
        return data;
      }),
  },
});
