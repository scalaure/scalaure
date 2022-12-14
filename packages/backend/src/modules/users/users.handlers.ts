import crypto from 'crypto';
import bcrypt from 'bcrypt';
import type { createUserSchema, activeUserSchema } from '@scalaure/common';
import type { TypeBoxRouteHandlerMethod } from 'types';

export const createUser: TypeBoxRouteHandlerMethod<typeof createUserSchema> = async (request, reply) => {
  const {
    config: { PASSWORD_SALT_OR_ROUNDS },
    prisma
  } = request.server;
  const { email, fullName, password } = request.body;

  const [firstName, lastName] = fullName
    .trim()
    .replace(/\s{2,}/g, ' ')
    .split(' ');

  const hashedPassword = await bcrypt.hash(
    password,
    isNaN(Number(PASSWORD_SALT_OR_ROUNDS)) ? PASSWORD_SALT_OR_ROUNDS : Number(PASSWORD_SALT_OR_ROUNDS)
  );

  const token = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      active: false,
      details: {
        create: { firstName, lastName }
      },
      userTokens: {
        create: { token, tokenType: 'ACCOUNT' }
      },
      roles: ['USER']
    },
    include: { details: true }
  });

  return reply.status(201).send(user);
};

export const activeUser: TypeBoxRouteHandlerMethod<typeof activeUserSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { token, userId } = request.params;

  const data = await prisma.userTokens.findFirst({ where: { token, userId, tokenType: 'ACCOUNT' } });

  if (!data) {
    return reply.notFound('Incorrect token.');
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { active: true } }),
    prisma.userTokens.delete({ where: { id: data.id } })
  ]);

  return reply.status(204).send();
};
