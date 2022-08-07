import { Prisma } from '@prisma/client';
import type { PrismaErrors } from './prismaErrors';

export const isPrismaError = (err: unknown): err is PrismaErrors =>
  !!err && err instanceof Prisma.PrismaClientKnownRequestError;
