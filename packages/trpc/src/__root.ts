import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    rat: publicProcedure.query(async ({ctx}) => {
        console.log("hi there");
        return "test"
    })
});
 