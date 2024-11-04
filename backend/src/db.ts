import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
export default Prisma;
