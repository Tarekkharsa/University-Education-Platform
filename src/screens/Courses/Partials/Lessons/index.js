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
import AddLessonModal from './Add'
import {tableColumns, tableHiddenColumns} from './data'
import EditLessonModal from './Edit'
import ShowLessonModal from './Show'

// ----------------------------------------------------------------------

export default function Lessons() {
  const {id} = useParams()
  const [lesson, setLesson] = useState(null)

  const [openEditModla, setOpenEditModla] = useState(false)
  const handleEditOpen = () => setOpenEditModla(true)
  const handleEditClose = () => setOpenEditModla(false)

  let newTableColumns = [
    ...tableColumns,
    {
      Header: 'actions',
      accessor: 'actions',
      Cell: ({row}) => {
        console.log('row', row)
        return (
          <LessonMoreMenu
            setOpen={setOpenEditModla}
            setLesson={setLesson}
            row={row.original}
          />
        )
      },
      style: {
        textAlign: 'right',
      },
    },
  ]
  const columns = useMemo(() => newTableColumns, [])
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
    queryKey: 'lessons',
    queryFn: () =>
      client(`course/getCourseLessonsWithDetails?id=${id}`).then(
        data => data.data.lessons,
      ),
  })

  const {mutate: handleRemoveClick} = useMutation(
    data => client(`course/lesson/delete`, {method: 'POST', data}),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('lessons')
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
    handleRemoveClick({section_ids: selectedRowsIds, course_id: id})
  }

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Lessons">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="lessons" />
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_lesson" />
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
        {open && (
          <AddLessonModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        )}
        {openEditModla && (
          <EditLessonModal
            open={openEditModla}
            handleOpen={handleEditOpen}
            handleClose={handleEditClose}
            lesson={lesson}
          />
        )}
      </Container>
    </Page>
  )
}
