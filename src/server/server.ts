import 'dotenv/config'
import { createApp } from './app.ts';

const fastify = await createApp();

const port = Number(process.env.PORT) || 8080;

fastify.listen({ port }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.debug(`Server is listening on port ${port}`);
});
