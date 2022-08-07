import fastifyEnv from '@fastify/env';
import { Type } from '@sinclair/typebox';
import fp from 'fastify-plugin';
import type { Static } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';

const schema = Type.Object({
  HOST: Type.String({ default: '127.0.0.1' }),
  PORT: Type.Number({ default: 3000 }),
  BASE_URL: Type.String({ default: '/api' }),
  PASSWORD_SALT_OR_ROUNDS: Type.Union([Type.String(), Type.Number()], {
    default: 10
  }),
  SESSION_SECRET: Type.String(),
  SESSION_COOKIE_NAME: Type.String(),
  NODE_ENV: Type.Union([Type.Literal('development'), Type.Literal('production')], { default: 'development' })
});

declare module 'fastify' {
  interface FastifyInstance {
    readonly config: Static<typeof schema>;
  }
}

const envPlugin: FastifyPluginAsync = async fastify => {
  await fastify.register(fastifyEnv, { schema, dotenv: true });
};

export default fp(envPlugin);
