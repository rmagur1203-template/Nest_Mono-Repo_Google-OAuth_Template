import { isProduction } from './util';

export const REFRESH_TOKEN_KEY = 'Refresh';
export const REFRESH_TOKEN_OPTION = () => ({
  ...(isProduction() ? { domain: process.env.SERVICE_DOMAIN } : {}),
  httpOnly: isProduction(),
  secure: isProduction(),
  maxAge: 2592000000,
});
