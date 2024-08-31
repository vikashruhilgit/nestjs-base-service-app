/**
 * Validation for environment variable
 * https://joi.dev/api/?v=17.13.3
 */

import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'stage', 'production')
    .default('development'),
  PG_DB_PASSWORD: Joi.string().required(),
  PG_DB_DATABASE: Joi.string().required(),
  PG_DB_HOST: Joi.string().required(),
  PG_DB_PORT: Joi.string().required(),
  PG_DB_SYNC: Joi.string().required(),
  PG_DB_AUTOLOAD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
});
