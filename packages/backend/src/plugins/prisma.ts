import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    readonly prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async fastify => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async fastify => {
    await fastify.prisma.$disconnect();
  });
});

export default prismaPlugin;
