import Fastify from 'fastify';

export const fastify = Fastify({ logger: true });

await fastify.register(import('@fastify/sensible'));
await fastify.register(import('./plugins'));
await fastify.register(import('./modules'), ({ config }) => ({ prefix: config.BASE_URL }));
