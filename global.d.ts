export {};

import { PrismaClient } from "@prisma/client";

declare global {
  type Primsa = PrismaClient;
}