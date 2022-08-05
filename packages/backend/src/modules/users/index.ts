import { createUserSchema } from '@scalaure/common';
import { createUser } from './handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginCallbackTypebox = (fastify, options, done) => {
  fastify.post('/', { schema: createUserSchema }, createUser);

  done();
};

export default usersPlugin;
