import {
  Alert,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material'
import Iconify from 'components/Iconify'
import {FullPageSpinner} from 'components/lib'
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import moment from 'moment'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {FaSpinner} from 'react-icons/fa'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import useStyles from './styles'

export default function QuizInfo() {
  const navigate = useNavigate()
  const classes = useStyles()
  const {course_id, quiz_id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'quiz',
    queryFn: () =>
      client(`module/quiz/getQuizQuestions?quiz_id=${quiz_id}`).then(
        data => data.data,
      ),
  })

  const {
    mutate,
    isError,
    error: startError,
    isLoading: isLoadingStart,
  } = useMutation(
    data => client(`module/quiz/startAttemptQuiz?quiz_id=${quiz_id}`),
    {
      onSuccess: data => {
        navigate('start-quiz')
      },
    },
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      {isError ? <Alert severity="error">{startError?.message}</Alert> : null}
      <List className={classes.root}>
        <ListItem button className={classes.li}>
          <ListItemIcon>
            <FormattedMessage id="name" />
          </ListItemIcon>
          <div>{data?.name}</div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="description" />
          </ListItemIcon>
          <div>{data?.intro}</div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="grade" />
          </ListItemIcon>
          <div>{data?.grade * 10}</div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="grade_pass" />
          </ListItemIcon>
          <div>{data?.gradepass * 10}</div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="time_open" />
          </ListItemIcon>
          <div>
            {moment(data?.timeopen * 1000).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="time_close" />
          </ListItemIcon>
          <div>
            {moment(data?.timeclose * 1000).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        {/* <ListItem button className={classes.descLi}>
          <ListItemIcon>
            <FormattedMessage id="time_limit" />
          </ListItemIcon>
          <div>
            {data?.timelimit} <FormattedMessage id="minutes" />
          </div>
        </ListItem>
        <Divider variant="inset" component="li" /> */}
      </List>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="start_quiz" />
          </Typography>
          <IconButton
            onClick={() => mutate()}
            style={{
              color: '#fff',
              padding: '20px',
              backgroundColor: '#1890FF',
            }}
            disabled={isLoadingStart}
          >
            {isLoadingStart ? (
              <FaSpinner />
            ) : (
              <Iconify icon="codicon:debug-start" />
            )}
          </IconButton>
        </Stack>
      </Container>
    </>
  )
}
