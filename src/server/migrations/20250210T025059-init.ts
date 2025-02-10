'use server'

import { type Kysely, sql } from 'kysely'

function withTimestamps(qb: any) {
  return qb
    .addColumn('created_at', 'timestamptz', (col: any) =>
      col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamptz', (col: any) =>
      col.defaultTo(sql`now()`).notNull())
}

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('invoice_status')
    .asEnum([
      'PAID',
      'UNPAID',
      'PENDING',
      'CANCELLED',
      'FAILED',
      'REFUNDED',
      'EXPIRED',
      'PROCESSING',
      'COMPLETED',
    ])
    .execute()

  await db.schema
    .createTable('invoices')
    .addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('invoice_number', 'text', col => col.unique().notNull())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('amount', 'integer', col => col.notNull())
    .addColumn('status', sql`"invoice_status"`, col => col.notNull())
    .$call(withTimestamps)
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('invoices').execute()
  await db.schema.dropType('invoice_status').execute()
}
