import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.__prisma__ || new PrismaClient();

if (process.env.NODE_ENV === "development") globalForPrisma.__prisma__ = prisma;

export default prisma;
