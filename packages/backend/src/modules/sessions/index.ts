import { createSessionSchema, getSessionSchema, deleteSessionSchema } from '@scalaure/common';
import { createSession, getSession, deleteSession } from './sessions.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createSessionSchema }, createSession);
  fastify.get('/me', { schema: getSessionSchema, preHandler: fastify.auth() }, getSession);
  fastify.delete('/me', { schema: deleteSessionSchema, preHandler: fastify.auth() }, deleteSession);

  done();
};

export default sessionsPlugin;
