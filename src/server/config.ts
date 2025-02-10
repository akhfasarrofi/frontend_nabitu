import type Database from '__generated__/Database'

import { Kysely, PostgresDialect } from 'kysely'
import pkg from 'pg'

import env from '@/constants/env'

const { Pool } = pkg

export const dialect = new PostgresDialect({
  pool: new Pool({
    ssl: true,
    connectionString: env.DATAABASE_URL,
  }),
})

/**
 * Initializes a database connection using Kysely with the given Database type.
 * Provides custom logging for each event request.
 */
export const db = new Kysely<Database>({
  dialect,
  log(event) {
    if (event.level === 'error') {
      console.error(JSON.stringify({
        error: event.error,
        sql: event.query.sql,
        params: event.query.parameters,
      }))
    }
    else {
      console.debug(JSON.stringify({
        sql: event.query.sql,
        params: event.query.parameters,
      }))
    }
  },
})
