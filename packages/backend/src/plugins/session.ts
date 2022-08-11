import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';
import type { UserRole, User, UserDetails } from '@prisma/client';
import type { FastifyPluginAsync, preHandlerHookHandler } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    auth: (...roles: UserRole[]) => preHandlerHookHandler;
  }

  interface FastifyRequest {
    userData: User & { details: UserDetails };
  }

  interface Session {
    userId: number;
  }
}

const sessionPlugin: FastifyPluginAsync = async fastify => {
  const { config } = fastify;

  await fastify.register(fastifySession, {
    secret: config.SESSION_SECRET,
    cookieName: config.SESSION_COOKIE_NAME,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  });

  fastify.decorate('auth', (...roles: UserRole[]): preHandlerHookHandler => {
    return async (request, reply) => {
      const { userId } = request.session;
      const { prisma } = request.server;

      if (!userId) {
        return reply.unauthorized('Unauthorized.');
      }

      const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
        include: { details: true }
      });

      if (roles.length > 0 && !roles.some(role => user.roles.includes(role))) {
        return reply.forbidden('Forbidden.');
      }

      request.userData = user;
    };
  });
};

export default fp(sessionPlugin);
