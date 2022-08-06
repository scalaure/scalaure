import fp from 'fastify-plugin';
import type { User } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    readonly findUserBy: (
      where: { readonly email?: string; readonly id?: number },
      details?: boolean
    ) => Promise<User | null>;
  }
}

const usersService = fp(fastify => {
  fastify.decorate('findUserBy', async (where: { readonly email?: string; readonly id?: number }, details = false) => {
    const user = await fastify.prisma.user.findFirst({ where, include: { details } });
    return user;
  });
});

export default usersService;
