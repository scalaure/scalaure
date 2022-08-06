import type { FastifyPluginAsync } from 'fastify';

const modules: FastifyPluginAsync = async fastify => {
  await fastify.register(import('./users'), { prefix: '/users' });
  await fastify.register(import('./sessions'), { prefix: '/sessions' });
};

export default modules;
