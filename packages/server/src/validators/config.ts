import Joi from 'joi';

export const ConfigValidator = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('production'),
  CORS_ORIGIN: Joi.string(),
  CORS_METHODS: Joi.string().default('GET,PUT,POST,PATCH,DELETE'),
  CORS_CREDENTIALS: Joi.boolean().default(true),
  CORS_PREFLIGHT: Joi.boolean().default(false),
  CORS_OPTIONS_STATUS: Joi.number().default(204),
  SWAGGER_ENABLED: Joi.boolean(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_NAME: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  VALIDATION_WHITELIST: Joi.boolean().default(true),
  VALIDATION_TRANSFORM: Joi.boolean().default(true),
  VALIDATION_FORBID_UNKNOWN: Joi.boolean().default(true),
  VALIDATION_FORBID_NON_WHITELISTED: Joi.boolean().default(true),
  VALIDATION_TARGET: Joi.boolean().default(false),
});
