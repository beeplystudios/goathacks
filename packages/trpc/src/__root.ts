import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    test: publicProcedure.query(() => "test")
});
