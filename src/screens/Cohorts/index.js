// material
import {Button, Container, Stack, Typography} from '@mui/material'
import ReactTable from 'components/ReactTable'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {UserMoreMenu} from 'sections/@dashboard/user'
//
import USERLIST from '_mocks_/user'
import categoriesLIST from '_mocks_/categories'
import {tableColumns, tableHiddenColumns} from './data'
import {queryCache, useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from 'context/auth-context'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'

// ----------------------------------------------------------------------

export default function Cohorts() {
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []
  const {user} = useAuth()
  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'cohorts',
    queryFn: () => client('cohorts').then(data => data),
  })

  const {mutate: handleRemoveClick} = useMutation(
    ({id}) => client(`cohorts/${id}`, {method: 'DELETE'}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('cohorts')
      },
    },
  )

  const getSelectedRows = useCallback(({selectedFlatRows}) => {
    selectedRowsIds = []
    selectedFlatRows.length > 0 &&
      selectedFlatRows.map((row, i) => {
        selectedRowsIds.push(row.values.id)
      })
    setRows(selectedRowsIds)
  }, [])

  const onDelete = selectedRows => {
    selectedRowsIds = []
    selectedRows.length > 0 &&
      selectedRows.map((row, i) => {
        selectedRowsIds.push(row.values.id)
      })
    handleRemoveClick({id: selectedRowsIds[0]})
  }

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Cohorts">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Cohorts
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/cohorts/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Cohort
          </Button>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data}
          getSelectedRows={getSelectedRows}
          onDelete={onDelete}
          loading={isLoading}
          totalRecords={data?.length}
        />
      </Container>
    </Page>
  )
}
