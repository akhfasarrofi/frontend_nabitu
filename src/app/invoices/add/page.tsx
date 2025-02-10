'use client'

import InvoiceStatus from '__generated__/public/InvoiceStatus'
import AddIcon from '@mui/icons-material/Add'
import { Button, Card, CardHeader, Container, Grid2, MenuItem, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { CreateInvoice } from '@/app/invoices/actions'
import type { FormData } from '@/lib/schemas/create-invoice.schema'

import { createInvoice } from '@/app/invoices/actions'
import FormProvider from '@/components/FormProvider'
import { resolver } from '@/lib/schemas/create-invoice.schema'

export default function AddInovicesPage() {
  const status = [
    InvoiceStatus.PAID,
    InvoiceStatus.UNPAID,
    InvoiceStatus.PENDING,
    InvoiceStatus.CANCELLED,
    InvoiceStatus.FAILED,
    InvoiceStatus.REFUNDED,
    InvoiceStatus.EXPIRED,
    InvoiceStatus.PROCESSING,
    InvoiceStatus.COMPLETED,
  ]

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver,
    defaultValues: {
      invoice_number: '',
      amount: '',
      name: '',
      // due_date: dayjs(),
      status: 'PENDING',
    },
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: {
      errors,
      isSubmitting,
    },
  } = methods

  /**
   * Handles form submission by creating an invoice and displaying a toast notification.
   */
  const onFinish = async () => {
    await createInvoice(getValues() as unknown as CreateInvoice)
    reset()
    toast.success('Success', {
      description: 'Invoice created successfully',
    })
  }

  return (
    <Container>
      <Typography variant="h5" fontWeight={700} mb={1}>Add Invoices</Typography>
      <Card>
        <CardHeader title="Invoice Form" />
        <FormProvider methods={methods} onSubmit={handleSubmit(onFinish)}>
          <Grid2 container spacing={2} sx={{ p: 2 }}>
            <Grid2 size={6}>
              <Controller
                {...register('name')}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Name"
                    placeholder="Enter your invoice name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={6}>
              <Controller
                {...register('invoice_number')}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Invoice Number"
                    placeholder="Enter your invoice number"
                    error={!!errors.invoice_number}
                    helperText={errors.invoice_number?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={6}>
              <Controller
                {...register('amount')}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Amount"
                    placeholder="Enter your invoice amount"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    slotProps={{
                      input: {
                        type: 'number',
                        inputMode: 'numeric',
                      },
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={6}>
              <Controller
                {...register('status')}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Status"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    fullWidth
                    select
                    size="small"
                  >
                    {status.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid2>
          </Grid2>
          <div className="text-end pr-4 py-4">
            <Button
              type="submit"
              variant="contained"
              loading={isSubmitting}
              startIcon={<AddIcon />}

            >
              Add Invoice
            </Button>
          </div>
        </FormProvider>
      </Card>
    </Container>
  )
}
