import bcrypt from 'bcrypt';
import type { createSessionSchema } from '@scalaure/common';
import type { TypeBoxRouteHandlerMethod } from 'types';

export const createSession: TypeBoxRouteHandlerMethod<typeof createSessionSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { email, password } = request.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.notFound('Incorrect username or password.');
  }

  request.session.userId = user.id;

  return { loggedin: true }; // TODO: change response body
};