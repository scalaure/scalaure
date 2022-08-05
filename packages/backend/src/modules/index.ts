import type { FastifyPluginAsync } from 'fastify';

const modules: FastifyPluginAsync = async fastify => {
  const { BASE_URL } = fastify.config;

  await fastify.register(import('./users'), { prefix: `${BASE_URL}/users` });
};

export default modules;
