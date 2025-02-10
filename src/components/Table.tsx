import type { ReactNode } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export interface Column<T> {
  key: keyof T | 'actions'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  render?: (value: T[keyof T], record: T) => ReactNode
}

/**
 * A reusable table component that renders a Material-UI table with a set of columns and data.
 *
 * @param dataSource - An object containing the data to be displayed in the table.
 * @param dataSource.dataSource - An array of data objects to be displayed in the table.
 * @param dataSource.columns - An array of column definitions, including the key, label, minimum width, alignment, and optional render function.
 * @returns A Material-UI table component with the provided data and columns.
 */
export default function BaseTable<T>({ dataSource, columns }: {
  dataSource: T[]
  columns: Column<T>[]
}) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map(column => (
                <TableCell
                  key={column.key as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.length > 0
              ? (
                  dataSource.map((row, idx) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                        const value = row[column.key as keyof T]

                        return (
                          <TableCell key={column.key as string} align={column.align}>
                            {column.render ? column.render(value, row) : (value as ReactNode)}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
