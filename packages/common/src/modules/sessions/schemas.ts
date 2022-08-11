import { Type } from '@sinclair/typebox';
import { createTypeBoxFastifySchema } from '../../utils/schema';
import { UserSchema } from '../users';

export const createSessionSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    email: Type.String(),
    password: Type.String()
  }),
  response: {
    200: UserSchema
  }
});

export const getSessionSchema = createTypeBoxFastifySchema({
  response: {
    200: UserSchema
  }
});

export const deleteSessionSchema = createTypeBoxFastifySchema({
  response: {
    204: Type.Object({})
  }
});
