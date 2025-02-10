import type { Invoices } from '__generated__/public/Invoices'

import { Container, Typography } from '@mui/material'

import type { Column } from '@/components/Table'

import { listInvoice } from '@/app/invoices/actions'
import BaseTable from '@/components/Table'
import formattedNumber from '@/utils/formattedNumber'

import InvoiceActions from './InvoiceAction'

export default async function ListInvoicesPage() {
  const invoices = await listInvoice()

  const columns: Column<Invoices>[] = [
    {
      key: 'name',
      label: 'Invoice',
      minWidth: 150,
      render: (_, record) => {
        const { name, invoice_number } = record

        return (
          <>
            <Typography variant="body2" className="capitalize">{name}</Typography>
            <Typography variant="body2" className="uppercase">{invoice_number}</Typography>
          </>
        )
      },
    },
    {
      key: 'created_at',
      label: 'Due Date',
      minWidth: 100,
      render: value =>
        value
          ? new Date(value).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : '-',
    },
    {
      key: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
    },
    {
      key: 'amount',
      label: 'Amount',
      minWidth: 100,
      align: 'right',
      render: (_, record) => (
        <Typography>
          {formattedNumber(record.amount, 'id-ID', {
            currency: 'IDR',
            style: 'currency',
          })}
        </Typography>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      render: (_, record) => <InvoiceActions id={record.id} />,
    },
  ]

  return (
    <Container>
      <Typography variant="h5" fontWeight={700} mb={1}>My Invoices</Typography>
      <BaseTable
        dataSource={invoices.result}
        columns={columns}
      />
    </Container>
  )
}
