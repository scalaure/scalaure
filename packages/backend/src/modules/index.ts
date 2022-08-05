import type { FastifyPluginAsync } from 'fastify';

const modules: FastifyPluginAsync = async fastify => {
  await fastify.register(import('./users'), { prefix: '/users' });
};

export default modules;
