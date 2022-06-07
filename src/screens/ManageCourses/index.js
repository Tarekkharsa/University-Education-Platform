// material
import {Button, Container, Stack, Typography} from '@mui/material'
import {useTheme} from '@mui/styles'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import ReactTable from 'components/ReactTable'
import {useAuth, useClient} from 'context/auth-context'
import useRoles from 'hooks/useRoles'
import {useCallback, useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink} from 'react-router-dom'
import {tableColumns, tableHiddenColumns} from './data'
// ----------------------------------------------------------------------

export default function ManageCourses() {
  const theme = useTheme()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []
  const {checkIfRolesInUserRoles} = useRoles()
  const {user} = useAuth()
  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'manage-courses',
    queryFn: () =>
      client(
        checkIfRolesInUserRoles(['ROLE_ADMIN'])
          ? 'course/getAll'
          : `course/enroll/getUserCourses?user_id=${user.id}`,
      ).then(data => data.data),
  })

  const {mutate: handleRemoveClick} = useMutation(
    ({id}) => client(`course/delete`, {method: 'POST', data: {course_ids: id}}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('manage-courses')
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
    handleRemoveClick({id: selectedRowsIds})
  }

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Manage Courses">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="courses" />
          </Typography>
          {checkIfRolesInUserRoles(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/manage-courses/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              <FormattedMessage id="new_course" />
            </Button>
          )}
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
