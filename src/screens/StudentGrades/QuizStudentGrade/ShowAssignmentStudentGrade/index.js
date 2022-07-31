// material
import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import ReactTable from 'components/ReactTable'
import {useAuth, useClient} from 'context/auth-context'
import {useCallback, useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import {tableColumns, tableHiddenColumns} from './data'

// ----------------------------------------------------------------------

export default function ShowAssignmentStudentGrade() {
  const {id} = useParams()
  const {user} = useAuth()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()
  // add modle
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'getGradesAssignmentForStudent',
    queryFn: () =>
      client(`module/assignment/getCourseAssignments?course_id=${id}`).then(
        data => data?.data,
      ),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Assignment">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="assignments" />
          </Typography>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data?.courseAssignments[0]?.assignments}
          loading={isLoading}
          totalRecords={data?.courseAssignments[0]?.assignments?.length}
        />
      </Container>
    </Page>
  )
}
