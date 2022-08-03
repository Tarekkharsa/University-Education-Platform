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

export default function AssignmentSubmissions() {
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
  const search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i]
      }
    }
  }
  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'getAssignmentSubmissions',
    queryFn: () =>
      client(
        `module/assignment/getAssignmentSubmissions?assignment_id=${assignment_id}`,
      ).then(data => {
        let newData = data?.data?.filter(item => {
          if (
            search('ROLE_TEACHER', item?.user?.roles) === undefined &&
            search('ROLE_MANAGER', item?.user?.roles) === undefined
          ) {
            return item
          }
        })
        return newData
      }),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Participants">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="submissions" />
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
