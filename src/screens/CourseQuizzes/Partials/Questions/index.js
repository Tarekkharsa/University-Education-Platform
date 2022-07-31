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
import LessonMoreMenu from 'sections/@dashboard/courses/LessonMoreMenu'
import AddMultiChoiceQuestion from './AddMultiChoiceQuestion'
import AddTrueFalseQuestion from './AddTrueFalseQuestion'
import {tableColumns, tableHiddenColumns} from './data'

// ----------------------------------------------------------------------

export default function Questions() {
  const {quiz_id} = useParams()
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

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'questions',
    queryFn: () =>
      client(`module/quiz/getQuizQuestions?quiz_id=${quiz_id}`).then(data => {
        return data?.data?.quiestion
      }),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Questions">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="questions" />
          </Typography>
          <div>
            <Button
              variant="contained"
              onClick={handleOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              <FormattedMessage id="create_true_false_question" />
            </Button>
            <Button
              style={{marginLeft: '10px'}}
              variant="contained"
              onClick={handleOpenMultiChoice}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              <FormattedMessage id="create_multi_choice_question" />
            </Button>
          </div>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data}
          loading={isLoading}
          totalRecords={data?.length}
        />
        {open && (
          <AddTrueFalseQuestion
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        )}
        {openMultiChoice && (
          <AddMultiChoiceQuestion
            open={openMultiChoice}
            handleOpen={handleOpenMultiChoice}
            handleClose={handleCloseMultiChoice}
          />
        )}
      </Container>
    </Page>
  )
}
