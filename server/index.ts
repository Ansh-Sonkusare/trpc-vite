import { createContext, createTRPCRouter, publicProcedure } from "./trpc";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import cors from "cors";

const User = z.object({
  name: z.string(),
  email: z.string(),
});

export const appRouter = createTRPCRouter({
  greeting: publicProcedure.query(async () => {
    console.log("Hello");
    return "hello tRPC !";
  }),

  userCreate: publicProcedure.input(User).mutation(async ({ ctx, input }) => {
    const d = await ctx.db.user.create({
      data: input,
    });
    console.log(d);

    return input;
  }),
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext: () => createContext(),
  middleware: cors(),
});

server.listen(3000);

export type AppRouter = typeof appRouter;
