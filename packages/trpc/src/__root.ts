import { test } from "@goathacks/db/schema";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    rat: publicProcedure.query(async ({ctx}) => {
        console.log("hi there");
        const query = await ctx.db.select().from(test).all();

        return query[0].id;
    })
});
 