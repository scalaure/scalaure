import { createUserSchema } from '@scalaure/common';
import { createUser } from './users.handlers';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginAsyncTypebox = async fastify => {
  await fastify.register(import('./users.service'));

  fastify.post('/', { schema: createUserSchema }, createUser);
};

export default usersPlugin;
