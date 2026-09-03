import { createPool, type Pool } from 'mysql2/promise';

const globalDatabase = globalThis as typeof globalThis & {
  shantiHavenPool?: Pool;
  shantiHavenSchema?: Promise<void>;
};

function firstValue(...values: Array<string | undefined>) {
  return values.find((value) => value?.trim())?.trim();
}

function createDatabasePool() {
  if (process.env.DATABASE_URL) {
    return createPool(process.env.DATABASE_URL);
  }

  const host = firstValue(process.env.DB_HOST, process.env.MYSQL_HOST, process.env.MYSQLHOST);
  const database = firstValue(process.env.DB_NAME, process.env.MYSQL_DATABASE, process.env.MYSQLDATABASE);
  const user = firstValue(process.env.DB_USER, process.env.MYSQL_USER, process.env.MYSQLUSER);
  const password = firstValue(process.env.DB_PASSWORD, process.env.MYSQL_PASSWORD, process.env.MYSQLPASSWORD);
  const port = Number(firstValue(process.env.DB_PORT, process.env.MYSQL_PORT, process.env.MYSQLPORT) ?? '3306');

  if (!host || !database || !user || !password) {
    throw new Error('MySQL is not configured. Add DB_HOST, DB_NAME, DB_USER and DB_PASSWORD in GoDaddy Secrets.');
  }

  return createPool({
    host,
    port,
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 5,
    timezone: 'Z',
    ssl: process.env.DB_SSL === 'true' ? {} : undefined,
  });
}

export function getDb() {
  globalDatabase.shantiHavenPool ??= createDatabasePool();
  return globalDatabase.shantiHavenPool;
}

export function ensureBookingsTable() {
  globalDatabase.shantiHavenSchema ??= getDb().execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      gender VARCHAR(40) NOT NULL,
      email VARCHAR(180) NOT NULL,
      mobile VARCHAR(25) NOT NULL DEFAULT '',
      service VARCHAR(80) NOT NULL,
      appointment_time DATETIME(3) NOT NULL,
      timezone VARCHAR(80),
      notes TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'received',
      created_at DATETIME(3) NOT NULL,
      INDEX idx_bookings_appointment_time (appointment_time)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `).then(() => undefined);

  return globalDatabase.shantiHavenSchema;
}
