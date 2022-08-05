import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = fp(async fastify => {
  await fastify.register(import('./env'));
  await fastify.register(import('./prisma'));
  await fastify.register(import('./session'));
});

export default plugins;
