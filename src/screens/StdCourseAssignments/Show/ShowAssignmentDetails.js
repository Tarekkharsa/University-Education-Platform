import {
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
import {useAuth, useClient} from 'context/auth-context'
import moment from 'moment'
import {useState} from 'react'
import {FaSpinner} from 'react-icons/fa'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import UploadAssignmentModal from '../Partials/UploadAssignmentModal'
import useStyles from './styles'

export default function ShowAssignmentDetails() {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const {user} = useAuth()
  const {course_id, assignment_id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'assignment',
    queryFn: () =>
      client(
        `module/assignment/getCourseAssignmentById?course_id=${course_id}&assignment_id=${assignment_id}`,
      ).then(data => data.data),
  })

  const {
    isLoading: isLoadingGeneralInfo,
    error: errorGeneralInfo,
    data: dataGeneralInfo,
  } = useQuery({
    queryKey: 'assignmentGeneralInfo',
    queryFn: () =>
      client(
        `module/assignment/getGeneralInfoAssignment?assignment_id=${assignment_id}`,
      ).then(data => data.data),
  })

  if (isLoading || isLoadingGeneralInfo) {
    return <FullPageSpinner />
  }

  return (
    <>
      <List className={classes.root}>
        <ListItem button className={classes.li}>
          <ListItemIcon>
            <FormattedMessage id="name" />
          </ListItemIcon>
          <div>{data?.assignment?.name}</div>
        </ListItem>
        <Divider variant="inset" component="li" />
        {/* 
        <ListItem button className={classes.li}>
          <ListItemIcon>
            <FormattedMessage id="submissions_enabled" />
          </ListItemIcon>
          <div>{dataGeneralInfo?.submissionsenabled ? 'Yes' : 'No'}</div>
        </ListItem>
        <Divider variant="inset" component="li" /> */}

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="time_open" />
          </ListItemIcon>
          <div>
            {moment(data?.assignment?.allowsubmissionsfromdate * 1000).format(
              'MMMM Do YYYY, h:mm:ss a',
            )}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="time_close" />
          </ListItemIcon>
          <div>
            {moment(data?.assignment?.duedate * 1000).format(
              'MMMM Do YYYY, h:mm:ss a',
            )}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem className={classes.li}>
          <ListItemIcon>
            <Iconify className={classes.icon} icon="akar-icons:file" />
          </ListItemIcon>
          <ListItemText
            primary={data?.assignment?.introattachments[0]?.filename}
          />
          <IconButton
            onClick={() =>
              window.open(
                `${data?.assignment?.introattachments[0]?.fileurl}?token=${data?.tokenfile}`,
                '_blank',
              )
            }
          >
            <Iconify className={classes.icon} icon="bi:file-arrow-down" />
          </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="upload_assignment" />
          </Typography>
          <IconButton
            onClick={() => setOpen(true)}
            style={{
              color: '#fff',
              padding: '20px',
              backgroundColor: '#1890FF',
            }}
            // disabled={isLoadingStart}
          >
            {false ? <FaSpinner /> : <Iconify icon="fa-solid:file-upload" />}
          </IconButton>
        </Stack>
      </Container>

      {open && (
        <UploadAssignmentModal
          module_id={data?.assignment?.cmid}
          handleClose={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  )
}
