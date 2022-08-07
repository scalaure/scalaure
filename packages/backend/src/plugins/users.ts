import fp from 'fastify-plugin';
import type { Prisma, User } from '@prisma/client';
import type { FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    readonly findUserBy: (where: Prisma.UserWhereInput, details?: boolean) => Promise<User | null>;
  }
}

const usersPlugin: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorate('findUserBy', async (where: Prisma.UserWhereInput, details = false) => {
    const user = await fastify.prisma.user.findFirst({ where, include: { details } });
    return user;
  });

  done();
};

export default fp(usersPlugin);
