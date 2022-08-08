import { UserSchema } from '@scalaure/common';
import { createServer } from 'server';
import { ajv, inactiveAccountResponse, invalidEmailOrPasswordResponse } from 'utils';
import { mockActiveUser, mockInactiveUser } from 'utils/mocks';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import type { Server, IncomingMessage, ServerResponse } from 'http';

let cookie: string;
let server: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance, TypeBoxTypeProvider>;

beforeAll(async () => {
  server = await createServer({ logger: false });
  // Create two users, one active and one inactive
  await Promise.all([
    server.prisma.user.create({
      data: mockActiveUser,
      include: { details: true }
    }),
    server.prisma.user.create({
      data: mockInactiveUser,
      include: { details: true }
    })
  ]);
});

describe('POST /sessions', () => {
  it('should return 201 and create a session', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/sessions',
      payload: {
        email: 'active@test.com',
        password: 'Test123!'
      }
    });

    expect(response.statusCode).toEqual(201);
    expect(response.headers['Set-Cookie']).toBeDefined();
    expect(response.headers['Set-Cookie']).toMatch(/^sessionId=.+; Path=/);
    expect(ajv.validate(UserSchema, JSON.parse(response.payload))).toBe(true);

    cookie = response.headers['Set-Cookie'] as string;
  });

  it('should return 403 that the account is not active', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/sessions',
      payload: {
        email: 'inactive@test.com',
        password: 'Test123!'
      }
    });

    expect(response.statusCode).toEqual(403);
    expect(response.headers['Set-Cookie']).not.toBeDefined();
    expect(JSON.parse(response.payload)).toMatchObject(inactiveAccountResponse);
  });

  it('should return 404 that password is invalid', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/sessions',
      payload: {
        email: 'active@test.com',
        password: 'Test1234!'
      }
    });

    expect(response.statusCode).toEqual(404);
    expect(response.headers['Set-Cookie']).not.toBeDefined();
    expect(JSON.parse(response.payload)).toMatchObject(invalidEmailOrPasswordResponse);
  });

  it('should return 404 that e-mail is invalid', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/sessions',
      payload: {
        email: 'test1@test.com',
        password: 'Test123!'
      }
    });

    expect(response.statusCode).toEqual(404);
    expect(response.headers['Set-Cookie']).not.toBeDefined();
    expect(JSON.parse(response.payload)).toMatchObject(invalidEmailOrPasswordResponse);
  });
});

describe('GET /sessions/me', () => {
  it("should return 200 and user's data", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/sessions/me',
      headers: {
        'Set-Cookie': cookie
      }
    });

    expect(response.statusCode).toEqual(200);
    expect(ajv.validate(UserSchema, JSON.parse(response.payload))).toBe(true);
  });
});

afterAll(async () => {
  // Delete all tables
  // TODO: make it better (remove only users created in this test)
  await server.prisma.$queryRaw`drop schema public cascade;`;
  await server.prisma.$queryRaw`create schema public;`;
});
