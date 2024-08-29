import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  username: process.env.PG_DB_USERNAME || 'postgres',
  password: process.env.PG_DB_PASSWORD || 'postgres',
  database: process.env.PG_DB_DATABASE || 'nestjs-db',
  host: process.env.PG_DB_HOST || 'localhost',
  port: parseInt(process.env.PG_DB_PORT) || 5432,
  synchronize: process.env.PG_DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.PG_DB_AUTOLOAD === 'true' ? true : false,
}));
