import bcrypt from 'bcrypt';
import type { createSessionSchema, getSessionSchema, deleteSessionSchema } from '@scalaure/common';
import type { TypeBoxRouteHandlerMethod } from 'types';

export const createSession: TypeBoxRouteHandlerMethod<typeof createSessionSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { email, password } = request.body;

  if (request.session.userId) {
    return reply.notAcceptable('You are already logged in.');
  }

  const user = await prisma.user.findFirst({
    where: { email },
    include: { details: true }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.notFound('Incorrect username or password.');
  }

  if (!user.active) {
    return reply.forbidden('Account is not activated.');
  }

  request.session.userId = user.id;

  return user;
};

export const getSession: TypeBoxRouteHandlerMethod<typeof getSessionSchema> = async request => {
  return request.userData;
};

export const deleteSession: TypeBoxRouteHandlerMethod<typeof deleteSessionSchema> = (request, reply) => {
  request.session.destroy(() => {
    reply.clearCookie(request.server.config.SESSION_COOKIE_NAME).status(204).send();
  });
};
