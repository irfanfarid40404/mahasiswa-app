import { MiddlewareHandler } from '@cloudflare/workers-types';

export const onRequest: MiddlewareHandler<Env> = async (context) => {
  const response = await context.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};
