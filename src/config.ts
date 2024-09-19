import * as dotenv from 'dotenv';

dotenv.config({
  path: '${__dirname}/../.env'
});

export const port = Number(process.env.PORT);
export const dbPort = Number(process.env.DB_PORT);
export const dbUsername = String(process.env.DB_USERNAME);
export const dbName = String(process.env.DB_NAME);
export const dbPassword = String(process.env.DB_PASSWORD);
export const dbHost = String(process.env.DB_HOST);