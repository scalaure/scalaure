import { Type } from '@sinclair/typebox';
import { createTypeBoxFastifySchema } from '../../utils/schema';

export const createSessionSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    email: Type.String(),
    password: Type.String()
  })
});
