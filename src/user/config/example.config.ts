/**
 * Module specific config with types inject
 */

import { registerAs } from '@nestjs/config';

export const exampleConfiguration = registerAs('exampleConfiguration', () => ({
  example_var: process.env.EXAMPLE_VAR,
}));
