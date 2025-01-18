import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    rat: publicProcedure.query(() => {
        console.log("hi there");
        return "test";
    })
});
 