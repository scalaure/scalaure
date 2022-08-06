import { createUserSchema } from '@scalaure/common';
import { createUser } from './users.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createUserSchema }, createUser);

  done();
};

export default usersPlugin;
