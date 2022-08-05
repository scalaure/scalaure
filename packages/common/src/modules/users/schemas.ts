import { Type } from '@sinclair/typebox';
import { createTypeBoxFastifySchema } from '../../utils/schema';

export const User = Type.Object({
  id: Type.Number(),
  email: Type.String(),
  roles: Type.Array(Type.String()),
  details: Type.Object({
    firstName: Type.String(),
    lastName: Type.Union([Type.Null(), Type.String()])
  })
});

export const createUserSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    fullName: Type.String(),
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    201: User
  }
});
