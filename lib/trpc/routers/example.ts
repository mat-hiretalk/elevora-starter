import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.name}!`,
      };
    }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
    });
    return user;
  }),
});
