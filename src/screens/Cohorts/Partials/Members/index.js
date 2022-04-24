// material
import {Button, Container, Stack, Typography} from '@mui/material'
import ReactTable from 'components/ReactTable'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {Link as RouterLink, useParams} from 'react-router-dom'
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
import AddMemberModal from './Add'

// ----------------------------------------------------------------------

export default function Members() {
  const {id} = useParams()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'members',
    queryFn: () =>
      client(`cohort/getAllCohortMembers?cohort_id=${id}`).then(data =>
        data.data.filter(x => x !== null),
      ),
  })

  const {mutate: handleRemoveClick} = useMutation(
    data => client(`cohort/deleteMember`, {method: 'POST', data}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('members')
      },
    },
  )

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    handleRemoveClick({user_id: selectedRowsIds[0], cohort_id: id})
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
            Members
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Member
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
        <AddMemberModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </Container>
    </Page>
  )
}
