import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const add_invoice_schema = z.object({
  name: z.string({ message: 'Name is required' }).regex(/^[a-z]+$/i, { message: 'Name must be alphabetic' }),
  invoice_number: z.string({ message: 'Invoice number is required' }).regex(/^[a-z0-9]+$/i, { message: 'Invoice number must be alphanumeric' }),
  amount: z.string({ message: 'Amount is required' }).regex(/^\d+$/, { message: 'Amount must be numeric' }),
  status: z.enum([
    'PAID',
    'UNPAID',
    'PENDING',
    'CANCELLED',
    'FAILED',
    'REFUNDED',
    'EXPIRED',
    'PROCESSING',
    'COMPLETED',
  ]),
})

export type FormData = z.infer<typeof add_invoice_schema>
export const resolver = zodResolver(add_invoice_schema)
