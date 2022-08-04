import fastifyEnv from '@fastify/env';
import { Type } from '@sinclair/typebox';
import fastifyPlugin from 'fastify-plugin';
import type { Static } from '@sinclair/typebox';

const schema = Type.Object({
  HOST: Type.String({ default: '127.0.0.1' }),
  PORT: Type.Number({ default: 3000 })
});

declare module 'fastify' {
  interface FastifyInstance {
    readonly config: Static<typeof schema>;
  }
}

const envPlugin = fastifyPlugin(async fastify => {
  await fastify.register(fastifyEnv, { schema, dotenv: true });
});

export default envPlugin;
