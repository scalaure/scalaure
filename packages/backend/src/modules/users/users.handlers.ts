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
      roles: ['USER']
    },
    include: { details: true }
  });

  await prisma.userTokens.create({
    data: {
      userId: user.id,
      tokenType: 'ACCOUNT',
      token
    }
  });

  return reply.status(201).send(user);
};

export const activeUser: TypeBoxRouteHandlerMethod<typeof activeUserSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { token, userId } = request.params;

  const { id } = await prisma.userTokens.findFirstOrThrow({ where: { token, userId, tokenType: 'ACCOUNT' } });

  await prisma.user.update({ where: { id: userId }, data: { active: true } });
  await prisma.userTokens.delete({ where: { id } });

  return reply.status(204).send();
};
