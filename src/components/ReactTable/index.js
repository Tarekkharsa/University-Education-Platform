// material
import {
  Avatar,
  Card,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import {sentenceCase} from 'change-case'
import React, {useState} from 'react'
import {usePagination, useRowSelect, useTable} from 'react-table'
import Label from '../Label'
import Scrollbar from '../Scrollbar'
import SearchNotFound from '../SearchNotFound'
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from 'sections/@dashboard/user'
import CustomToolbar from './Partials/CustomToolbar'
import TablePaginationActions from './TablePaginationActions'
import {FullPageSpinner} from 'components/lib'
import useStyles from './styles'

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
  loading,
  pageCount: controlledPageCount,
  totalRecords,
  getSelectedRows,
  isPaginated = true,
}) {
  const classes = useStyles()
  const [filterName, setFilterName] = useState('')

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize, selectedRowIds},
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {pageIndex: 0, hiddenColumns, pageSize: 50},
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
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

  if (loading) {
    return <FullPageSpinner />
  }

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
        numSelected={selectedFlatRows.length}
        filterName={filterName}
        onFilterName={setFilterName}
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
              console.log('row', row)
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
          {totalRecords === 0 && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{py: 3}}>
                  <SearchNotFound searchQuery={'data'} />
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
                    console.log('e', e.value)
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
