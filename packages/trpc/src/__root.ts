import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { busSession, route } from "@goathacks/db/schema";
import { TRPCError } from "@trpc/server";
import { getDirections } from "./get-directions";
import { authedProcedure } from "./authed-procedure";

export const appRouter = router({
  test: authedProcedure.query(({ ctx }) => ctx.user.fullName),
  route: {
    get: authedProcedure
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

    getRouteInstructions: authedProcedure
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
  busSession: {
    getAllRoutes: publicProcedure.query(async ({ ctx }) => {
      const result = await ctx.db.query.busSession.findMany({
        with: {
          route: {
            columns: {
              name: true,
            },
            with: {
              stops: {
                columns: {
                  lat: true,
                  lon: true,
                },
              },
            },
          },
        },
      });

      console.log(result);

      const stops: {
        route: string;
        coords: { latitude: number; longitude: number };
      }[] = [];

      const routes: { route: string; routeColor: string }[] = [];

      result.forEach((item) => {
        item.route?.stops.forEach((stop) => {
          stops.push({
            route: item.route!.name!,
            coords: {
              latitude: stop.lat!,
              longitude: stop.lon!,
            },
          });
        });
        routes.push({ route: item.route!.name!, routeColor: "gold" });
      });

      return { stops, routes };
    }),
    create: authedProcedure
      .input(z.object({ routeId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const result = await ctx.db
          .insert(busSession)
          .values({
            driverId: ctx.user.id,
            routeId: input.routeId,
          })
          .returning();

        return result[0];
      }),
    get: authedProcedure.query(async ({ ctx }) => {
      const result = await ctx.db.query.busSession.findFirst({
        where: eq(busSession.driverId, ctx.user.id),
      });

      if (result === undefined) return null;

      return result;
    }),
    delete: authedProcedure.mutation(async ({ ctx }) => {
      const result = await ctx.db
        .delete(busSession)
        .where(eq(busSession.driverId, ctx.user.id));

      return result;
    }),
    updateLocation: authedProcedure
      .input(z.object({ lat: z.number(), lon: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await ctx.db
          .update(busSession)
          .set({
            lat: input.lat,
            lon: input.lon,
          })
          .where(eq(busSession.driverId, ctx.user.id));

        return result;
      }),
  },
});
