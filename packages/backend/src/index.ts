import { createServer } from './server';

const start = async () => {
  try {
    const server = await createServer({ logger: true });
    const address = await server.listen({
      host: server.config.HOST,
      port: server.config.PORT
    });

    console.log(`✨ Server has started running at ${address}!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

void start();
