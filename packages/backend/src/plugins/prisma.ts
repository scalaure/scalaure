import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import { PrismaErrorCode } from '../utils/prismaErrors';
import { isPrismaError } from '../utils/typeguards';
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

  const originalErrorHandler = fastify.errorHandler;

  fastify.setErrorHandler((err, request, reply) => {
    if (isPrismaError(err)) {
      switch (err.code) {
        case PrismaErrorCode.UniqueKeyViolation:
          if (err.meta.target.includes('email')) {
            reply.conflict('Provided e-mail is already in use.');
          }
        case PrismaErrorCode.RecordNotFound:
          reply.notFound('The resource you are trying to access does not exist.');
      }
    }

    originalErrorHandler(err, request, reply);
  });
});

export default prismaPlugin;
