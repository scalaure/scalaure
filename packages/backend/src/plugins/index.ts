import fastifyPlugin from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = fastifyPlugin(async fastify => {
  fastify.register(import('./env'));
});

export default plugins;
