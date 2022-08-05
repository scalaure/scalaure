import { Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export const createServer = async <T extends FastifyServerOptions>(opts?: T) => {
  const fastify = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(import('@fastify/cookie'));
  await fastify.register(import('@fastify/sensible'));
  await fastify.register(import('./plugins'));
  await fastify.register(import('./modules'), { prefix: '/api' });

  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: Type.String()
        }
      }
    },
    () => {
      return 'Hello from scalaure API';
    }
  );

  return fastify;
};
