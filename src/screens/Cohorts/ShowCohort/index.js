import {
  Button,
  Container,
  Divider,
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
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {useQuery} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import useStyles from './styles'

export default function ShowCohort() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'cohort',
    queryFn: () => client(`cohorts/${id}`).then(data => data),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="Cohort">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Cohort Details
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/cohorts/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Edit Cohort
          </Button>
        </Stack>

        <List className={classes.root}>
          <ListItem button className={classes.li}>
            <ListItemIcon>Name</ListItemIcon>
            <div>{data?.name}</div>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.descLi}>
            <ListItemIcon>Description</ListItemIcon>
            <div>{ReactHtmlParser(data?.description)}</div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Container>
    </Page>
  )
}
