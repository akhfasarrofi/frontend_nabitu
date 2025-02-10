'use server'

import type { Invoices } from '__generated__/public/Invoices'

import { db } from '@/server/config'

export type CreateInvoice = Omit<Invoices, 'id' | 'created_at' | 'updated_at'>

/**
 * Creates a new invoice
 *
 * @param {CreateInvoice} body - The invoice details excluding id, created_at, and updated_at.
 * @returns {Promise<{ id: string | undefined }>} The created invoice ID.
 */
export async function createInvoice(body: CreateInvoice): Promise<{ id: string | undefined }> {
  const result = await db.insertInto('invoices')
    .values({
      ...body,
      invoice_number: `INV-${body.invoice_number.toUpperCase()}`,
      amount: Number(body.amount),
    })
    .returning('id')
    .executeTakeFirst()

  return {
    id: result?.id,
  }
}

/**
 * Retrieves a list of all invoices.
 *
 * @returns {Promise<{ result: Invoices[] }>} An array of invoices.
 */
export async function listInvoice(): Promise<{
  result: Invoices[]
}> {
  const result = await db.selectFrom('invoices')
    .selectAll()
    .execute()

  return { result }
}

/**
 * Deletes an invoice by its ID.
 *
 * @param {Invoices['id']} id - The ID of the invoice to delete.
 * @returns {Promise<void>} No return value.
 */
export async function deleteById(id: Invoices['id']): Promise<void> {
  await db.deleteFrom('invoices').where('id', '=', id).executeTakeFirst()
}
