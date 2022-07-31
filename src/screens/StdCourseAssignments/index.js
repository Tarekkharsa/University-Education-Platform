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

export default function StdCourseAssignments() {
  const theme = useTheme()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
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

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Manage Course Assignments">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="course_assignments" />
          </Typography>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data}
          loading={isLoading}
          totalRecords={data?.length}
        />
      </Container>
    </Page>
  )
}
