import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface Session {
    // eslint-disable-next-line -- need mutable property here
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
};

export default fp(sessionPlugin);
