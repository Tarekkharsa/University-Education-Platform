// material
import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import ReactTable from 'components/ReactTable'
import {useClient} from 'context/auth-context'
import {useCallback, useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useParams} from 'react-router-dom'
import LessonMoreMenu from 'sections/@dashboard/courses/LessonMoreMenu'
import AddGroup from './AddGroup'
import AddUsers from './AddUsers'
import {tableColumns, tableHiddenColumns} from './data'
import RemoveGroup from './RemoveGroup'

// ----------------------------------------------------------------------

export default function CourseUsers() {
  const {id} = useParams()

  const [openUsersModal, setOpenUsersModal] = useState(false)
  const handleOpenUsersModal = () => setOpenUsersModal(true)
  const handleCloseUsersModal = () => setOpenUsersModal(false)

  const [openGroupModal, setOpenGroupModal] = useState(false)
  const handleOpenGroupModal = () => setOpenGroupModal(true)
  const handleCloseGroupModal = () => setOpenGroupModal(false)

  const [openRemoveGroupModal, setOpenRemoveGroupModal] = useState(false)
  const handleOpenRemoveGroupModal = () => setOpenRemoveGroupModal(true)
  const handleCloseRemoveGroupModal = () => setOpenRemoveGroupModal(false)

  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'course_users',
    queryFn: () =>
      client(`course/enroll/getCourseUsers?course_id=${id}`).then(
        data => data.data,
      ),
  })

  const {mutate: handleRemoveClick} = useMutation(
    data =>
      client(`course/enroll/unEnrollUserFromCourse`, {method: 'POST', data}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('course_users')
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
    console.log('selectedRows', selectedRows)
    selectedRowsIds = []
    let roleId
    selectedRows.length > 0 &&
      selectedRows.map((row, i) => {
        selectedRowsIds.push(row.values.id)
        roleId = row.values.roles[0].id
      })
    handleRemoveClick({
      user_ids: selectedRowsIds,
      role_id: roleId,
      course_id: id,
    })
  }

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Users">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="users" />
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          mb={5}
        >
          <Button
            variant="contained"
            sx={{mr: 3}}
            onClick={handleOpenUsersModal}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_users" />
          </Button>
          <Button
            variant="contained"
            sx={{mr: 3}}
            onClick={handleOpenGroupModal}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_group" />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpenRemoveGroupModal}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="delete_group" />
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
        {openUsersModal && (
          <AddUsers
            open={openUsersModal}
            handleOpen={handleOpenUsersModal}
            handleClose={handleCloseUsersModal}
          />
        )}
        {openGroupModal && (
          <AddGroup
            open={openGroupModal}
            handleOpen={handleOpenGroupModal}
            handleClose={handleCloseGroupModal}
          />
        )}
        {openRemoveGroupModal && (
          <RemoveGroup
            open={openRemoveGroupModal}
            handleOpen={handleOpenRemoveGroupModal}
            handleClose={handleCloseRemoveGroupModal}
          />
        )}
      </Container>
    </Page>
  )
}
