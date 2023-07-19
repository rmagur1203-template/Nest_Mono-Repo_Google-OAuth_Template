import { ConfigService } from '@nestjs/config';

export const isProduction = () =>
  new ConfigService().get('NODE_ENV') === 'production';
export const isDevelopment = () =>
  new ConfigService().get('NODE_ENV') === 'development';

export function isNumeric(value: any): boolean {
  return !isNaN(value) && !isNaN(parseInt(value));
}
