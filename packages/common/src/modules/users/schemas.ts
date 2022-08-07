import { Type } from '@sinclair/typebox';
import { createTypeBoxFastifySchema } from '../../utils/schema';
import type { Static } from '@sinclair/typebox';

export const UserSchema = Type.Object({
  id: Type.Number(),
  email: Type.String(),
  roles: Type.Array(Type.String()),
  details: Type.Object({
    firstName: Type.String(),
    lastName: Type.Union([Type.Null(), Type.String()])
  })
});

export type User = Static<typeof UserSchema>;

export const createUserSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    fullName: Type.String(),
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: UserSchema
  }
});

export const activeUserSchema = createTypeBoxFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
    token: Type.String()
  }),
  response: {
    204: Type.Object({})
  }
});
