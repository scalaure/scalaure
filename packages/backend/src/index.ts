import { fastify } from './server';

const start = async () => {
  const { config } = fastify;

  try {
    const address = await fastify.listen({
      host: config.HOST,
      port: config.PORT
    });

    console.log(`✨ Server started at ${address}!`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
