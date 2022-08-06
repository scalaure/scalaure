import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { TypeBoxFastifySchema } from '@scalaure/common';
import type {
  ContextConfigDefault,
  FastifyInstance,
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod
} from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';

export type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>;

export type TypeBoxRouteHandlerMethod<T extends TypeBoxFastifySchema> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  T,
  TypeBoxTypeProvider
>;
