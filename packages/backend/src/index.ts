import { fastify } from './server';

const start = async () => {
  const { config } = fastify;

  try {
    await fastify.listen({
      host: config.HOST,
      port: config.PORT
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
