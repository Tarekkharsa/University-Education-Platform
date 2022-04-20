// material
import {
  Card,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
import React, {useState} from 'react'
import {
  usePagination,
  useRowSelect,
  useTable,
  useGlobalFilter,
} from 'react-table'
import SearchNotFound from '../SearchNotFound'
import CustomToolbar from './Partials/CustomToolbar'
import useStyles from './styles'
import TablePaginationActions from './TablePaginationActions'

const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <Checkbox ref={resolvedRef} {...rest} />
  },
)

function ReactTable({
  columns,
  hiddenColumns,
  data: tableData,
  fetchData,
  pageCount: controlledPageCount,
  totalRecords,
  getSelectedRows,
  onDelete,
  isPaginated = true,
}) {
  const classes = useStyles()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    preGlobalFilteredRows,
    setGlobalFilter,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: {pageIndex, pageSize, selectedRowIds, globalFilter},
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {pageIndex: 0, hiddenColumns, pageSize: 10},
      // manualPagination: true,
      // pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    hooks => {
      getSelectedRows &&
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({getToggleAllPageRowsSelectedProps}) => (
              <>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </>
            ),
            Cell: ({row}) => (
              <>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </>
            ),
            style: {
              padding: '0 0 0 4px',
            },
          },
          ...columns,
        ])
    },
  )

  React.useEffect(() => {
    fetchData && fetchData({pageIndex, pageSize})
  }, [fetchData, pageIndex, pageSize])

  React.useEffect(() => {
    getSelectedRows && getSelectedRows({selectedRowIds, selectedFlatRows})
  }, [getSelectedRows, selectedRowIds, selectedFlatRows])

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value, 10))
    gotoPage(0)
  }

  return (
    <Card>
      <CustomToolbar
        selectedRows={selectedFlatRows}
        onDelete={onDelete}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <TableContainer sx={{minWidth: 800}}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    sx={column?.style ? column?.style : null}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell
                        sx={cell.column?.style ? cell.column?.style : null}
                        align="left"
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
          {page.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{py: 3}}>
                  <SearchNotFound searchQuery={globalFilter} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {Boolean(isPaginated) && (
        <TableFooter className={classes.pagination}>
          <TableRow className={classes.pagination}>
            <span className={classes.pagination}>
              Jump to Page:
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  value={pageIndex + 1}
                  onChange={e => {
                    gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)
                  }}
                >
                  {pageOptions.map(pageSize => (
                    <MenuItem key={pageSize} value={pageSize + 1}>
                      {pageSize + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </span>
            <TablePaginationActions
              rowsPerPageOptions={[50, 100, 200, 500]}
              colSpan={3}
              count={totalRecords}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Card>
  )
}

export default ReactTable
