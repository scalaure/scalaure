import { activeUserSchema, createUserSchema } from '@scalaure/common';
import { activeUser, createUser } from './users.handlers';
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createUserSchema }, createUser);
  fastify.patch('/:userId/activation/:token', { schema: activeUserSchema }, activeUser);

  done();
};

export default usersPlugin;
