import { createSessionSchema, getSessionSchema } from '@scalaure/common';
import { createSession, getSession } from './sessions.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createSessionSchema }, createSession);
  fastify.get('/me', { schema: getSessionSchema, preHandler: fastify.auth() }, getSession);

  done();
};

export default sessionsPlugin;
