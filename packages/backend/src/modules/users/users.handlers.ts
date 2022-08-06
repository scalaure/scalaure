import bcrypt from 'bcrypt';
import type { createUserSchema } from '@scalaure/common';
import type { TypeBoxRouteHandlerMethod } from 'types';

export const createUser: TypeBoxRouteHandlerMethod<typeof createUserSchema> = async (request, reply) => {
  const {
    config: { PASSWORD_SALT_OR_ROUNDS },
    userRegister
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

  const user = await userRegister({ email, firstName, lastName, hashedPassword });
  return reply.status(201).send(user);
};
