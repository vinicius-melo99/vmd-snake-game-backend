const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, '..', '..', '..', '.env') });

const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;

const config = {
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
};

module.exports = {
  development: config,
  production: config,
};
