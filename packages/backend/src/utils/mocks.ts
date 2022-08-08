import crypto from 'crypto';
import bcrypt from 'bcrypt';
import type { Prisma } from '@prisma/client';

export const mockActiveUser: Prisma.UserCreateInput = {
  email: 'active@test.com',
  password: bcrypt.hashSync('Test123!', 10),
  active: true,
  details: {
    create: {
      firstName: 'Test',
      lastName: 'User'
    }
  },
  userTokens: {
    create: {
      token: crypto.randomBytes(32).toString('hex'),
      tokenType: 'ACCOUNT'
    }
  },
  roles: ['USER']
};

export const mockInactiveUser: Prisma.UserCreateInput = {
  email: 'inactive@test.com',
  password: bcrypt.hashSync('Test123!', 10),
  active: false,
  details: {
    create: {
      firstName: 'Test',
      lastName: 'User'
    }
  },
  userTokens: {
    create: {
      token: crypto.randomBytes(32).toString('hex'),
      tokenType: 'ACCOUNT'
    }
  },
  roles: ['USER']
};
