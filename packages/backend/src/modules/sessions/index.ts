import { createSessionSchema } from '@scalaure/common';
import { createSession } from './sessions.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createSessionSchema }, createSession);

  done();
};

export default sessionsPlugin;
