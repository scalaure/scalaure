import fastifyPlugin from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = fastifyPlugin(async fastify => {
  await fastify.register(import('./env'));
});

export default plugins;
