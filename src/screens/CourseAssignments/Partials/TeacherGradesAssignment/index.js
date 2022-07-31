// material
import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import ReactTable from 'components/ReactTable'
import {useClient} from 'context/auth-context'
import {useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery, useQueryClient} from 'react-query'
import {useParams} from 'react-router-dom'
import {tableColumns, tableHiddenColumns} from './data'

// ----------------------------------------------------------------------

export default function TeacherGradesAssignment() {
  const {assignment_id} = useParams()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()
  // add multi choice question
  const [openMultiChoice, setOpenMultiChoice] = useState(false)
  const handleOpenMultiChoice = () => setOpenMultiChoice(true)
  const handleCloseMultiChoice = () => setOpenMultiChoice(false)
  // add true false question
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {isLoading, isSuccess, error, isError, data, refetch} = useQuery({
    queryKey: 'getGradesAssignmentForTeacher',
    queryFn: () =>
      client(
        `module/assignment/getGradesAssignmentForTeacher?assignment_id=${assignment_id}`,
      )
        .then(data => {
          console.log('data', data)
          if (data?.success) {
            return data?.data
          } else {
            return []
          }
        })
        .catch(err => {
          return err.message
        }),
  })
  console.log('error', error)
  console.log('data', data)
  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Assignment Grades">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="assignment_grades" />
          </Typography>
        </Stack>
        {Array.isArray(data) ? (
          <ReactTable
            columns={columns}
            hiddenColumns={hiddenColumns}
            data={data}
            loading={isLoading}
            totalRecords={data?.length}
          />
        ) : (
          <div style={{textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom>
              No grades found
            </Typography>
          </div>
        )}
      </Container>
    </Page>
  )
}
