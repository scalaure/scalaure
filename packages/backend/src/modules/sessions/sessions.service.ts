import fp from 'fastify-plugin';
import type { User } from '.prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    readonly findFirstByEmail: (email: string) => Promise<User | null>;
  }
}

const sessionsService = fp(fastify => {
  fastify.decorate('findFirstByEmail', async (email: string) => {
    const user = await fastify.prisma.user.findFirst({ where: { email } });
    return user;
  });
});

export default sessionsService;
