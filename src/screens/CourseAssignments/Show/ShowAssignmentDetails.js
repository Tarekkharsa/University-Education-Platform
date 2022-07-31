import {
  Button,
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
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import useStyles from './styles'

export default function ShowAssignmentDetails() {
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
    <List className={classes.root}>
      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="name" />
        </ListItemIcon>
        <div>{data?.assignment?.name}</div>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="submissions_enabled" />
        </ListItemIcon>
        <div>{dataGeneralInfo?.submissionsenabled ? 'Yes' : 'No'}</div>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="submissions_submitted_count" />
        </ListItemIcon>
        <div>{dataGeneralInfo?.submissionssubmittedcount}</div>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem button className={classes.li}>
        <ListItemIcon>
          <FormattedMessage id="participant_count" />
        </ListItemIcon>
        <div>{dataGeneralInfo?.participantcount}</div>
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
  )
}
