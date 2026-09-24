const postgres = require('postgres');
const { drizzle } = require('drizzle-orm/postgres-js');

const connectionString = process.env.DATABASE_URL;
const sql = connectionString
  ? postgres(connectionString, { prepare: false })
  : null;
const db = sql ? drizzle(sql) : null;

module.exports = { db, sql };
