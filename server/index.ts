import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import cors from "cors";

const prisma = new PrismaClient();
const User = z.object({
  name: z.string(),
  email: z.string(),
});
const appRouter = router({
  greeting: publicProcedure.query(async () => {
    return "hello tRPC !";
  }),
  userCreate: publicProcedure.input(User).mutation(async ({ input }) => {
    console.log(input);

    const user = await prisma.user.create({ data: input });
    console.log(user);

    return "Success";
  }),
  getUsers: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();

    return users;
  }),
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});
server.listen(3000);

export type AppRouter = typeof appRouter;
