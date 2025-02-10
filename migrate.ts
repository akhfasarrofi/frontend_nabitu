import type Database from '__generated__/Database'

import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely'
import { run } from 'kysely-migration-cli'
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import pkg from 'pg'

import env from '@/constants/env'

const { Pool } = pkg

/**
 * Retrieves the current file path and directory.
 */

/**
 * Creates a new Kysely instance to interact with the database.
 * The database connection is configured using the environment variables.
 */
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      ssl: true,
      connectionString: env.DATAABASE_URL,
    }),
  }),
})

/**
 * Creates a new Migrator instance to manage database migrations.
 * The migration provider is configured to use the FileMigrationProvider,
 * which reads migration files from the './migrations' directory.
 */
const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, './src/server/migrations'),
  }),
})

run(db, migrator, './src/server/migrations')
