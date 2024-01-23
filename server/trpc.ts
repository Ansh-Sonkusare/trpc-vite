import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";

const db = new PrismaClient();

export const createContext = async () => {
  return { db };
};

const t = initTRPC.context<typeof createContext>().create();

export const createTRPCRouter = t.router;
export const router = t.router;
export const publicProcedure = t.procedure;
