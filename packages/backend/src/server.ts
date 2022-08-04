import Fastify from 'fastify';

export const fastify = Fastify({ logger: true });

await fastify.register(import(/* webpackChunkName: 'Plugins' */ './plugins'));
