import { createSessionSchema } from '@scalaure/common';
import { createSession } from './sessions.handlers';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginAsyncTypebox = async fastify => {
  await fastify.register(import('./sessions.service'));

  fastify.post('/me', { schema: createSessionSchema }, createSession);
};

export default sessionsPlugin;
