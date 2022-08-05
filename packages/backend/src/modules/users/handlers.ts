import bcrypt from 'bcrypt';
import type { createUserSchema } from '@scalaure/common';
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

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        details: {
          create: { firstName, lastName }
        },
        roles: ['USER']
      },
      include: { details: true }
    });

    return reply.status(201).send(user);
  } catch (err) {
    reply.conflict('User with this email already exists.');
  }
};
