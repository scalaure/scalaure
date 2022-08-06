import { createSessionSchema } from '@scalaure/common';
import { createSession } from './sessions.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginCallbackTypebox = (fastify, options, done) => {
  fastify.post('/me', { schema: createSessionSchema }, createSession);

  done();
};

export default sessionsPlugin;
