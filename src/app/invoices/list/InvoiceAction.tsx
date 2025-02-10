'use client'

import type { Invoices } from '__generated__/public/Invoices'
import type { MouseEvent } from 'react'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, IconButton, Popover, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteById } from '../actions'

/**
 * InvoiceActions component provides actions for an invoice, including edit and delete options.
 *
 * @param {object} props - Component props
 * @param {string} props.id - The unique identifier of the invoice
 */
export default function InvoiceActions({ id }: { id: string }) {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  /**
   * Opens the delete confirmation popover.
   * @param {MouseEvent<HTMLButtonElement>} event - The click event
   */
  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * Closes the delete confirmation popover.
   */
  const onClose = () => {
    setAnchorEl(null)
  }

  /**
   * Deletes the invoice by its ID.
   * Displays a success or error toast notification based on the result.
   */
  const onDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteById(id as Invoices['id'])
      router.refresh()
      toast.success('Success', {
        description: 'Invoice deleted successfully',
      })
      setIsDeleting(false)
      onClose()
    }
    catch {
      toast.error('Error', {
        description: 'Failed to delete invoice',
      })
    }
  }

  const open = Boolean(anchorEl)
  const describedby = open ? 'simple-popover' : undefined

  return (
    <>
      <Tooltip title="Edit">
        <IconButton color="primary" size="small">
          <AddIcon />
        </IconButton>

      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          aria-describedby={describedby}
          color="error"
          size="small"
          onClick={onOpen}
        >
          <DeleteIcon />
        </IconButton>

      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ p: 2 }}
        slotProps={{
          paper: {
            sx: { p: 1, width: 200, overflow: 'inherit' },
          },
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure delete this invoice?</Typography>
        <Button
          disabled={isDeleting}
          loading={isDeleting}
          variant="contained"
          onClick={onDelete}
          color="error"
        >
          Delete
        </Button>
      </Popover>
    </>
  )
}
