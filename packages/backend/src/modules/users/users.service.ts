import fp from 'fastify-plugin';
import type { User } from '@scalaure/common';
import type { UserCredentials } from 'types';

declare module 'fastify' {
  interface FastifyInstance {
    readonly userRegister: (credentials: UserCredentials) => Promise<User>;
  }
}

const usersService = fp(fastify => {
  fastify.decorate('userRegister', async ({ email, firstName, hashedPassword, lastName }: UserCredentials) => {
    const user = await fastify.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        details: {
          create: { firstName, lastName }
        },
        roles: ['USER']
      },
      include: { details: true }
    });
    return user;
  });
});

export default usersService;
