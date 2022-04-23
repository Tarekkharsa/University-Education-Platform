// material
import {Button, Container, Stack, Typography} from '@mui/material'
import ReactTable from 'components/ReactTable'
import {useCallback, useMemo, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {UserMoreMenu} from 'sections/@dashboard/user'
//
import USERLIST from '_mocks_/user'
import {tableColumns, tableHiddenColumns} from './data'

// ----------------------------------------------------------------------

export default function Roles() {
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const fetchData = useCallback(({pageSize, pageIndex}) => {
    console.log('pageIndex', pageIndex)
  }, [])

  const getSelectedRows = useCallback(({selectedFlatRows}) => {
    selectedRowsIds = []
    selectedFlatRows.length > 0 &&
      selectedFlatRows.map((row, i) => {
        selectedRowsIds.push(row.values.id)
      })
    setRows(selectedRowsIds)
  }, [])

  const onDelete = selectedRows => {
    console.log('selectedRows', selectedRows)
  }
  return (
    <Page title="Roles">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Assign / UnAssign Role
          </Typography>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={USERLIST}
          fetchData={fetchData}
          getSelectedRows={getSelectedRows}
          onDelete={onDelete}
          loading={loading}
          pageCount={2}
          totalRecords={USERLIST.length}
          isPaginated={false}
        />
      </Container>
    </Page>
  )
}
