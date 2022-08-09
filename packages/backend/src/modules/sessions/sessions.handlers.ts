import bcrypt from 'bcrypt';
import type { createSessionSchema, getSessionSchema } from '@scalaure/common';
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
