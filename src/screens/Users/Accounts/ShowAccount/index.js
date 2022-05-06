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
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import {Link as RouterLink, useParams} from 'react-router-dom'
import useStyles from './styles'

export default function ShowAccount() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="User | Account">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="account_details" />
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/users/accounts/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            <FormattedMessage id="edit_user" />
          </Button>
        </Stack>

        <List className={classes.root}>
          <ListItem button className={classes.li}>
            <ListItemIcon>
              <FormattedMessage id="firstName" />
            </ListItemIcon>
            <div>{data?.firstname}</div>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <ListItemIcon>
              <FormattedMessage id="lastName" />
            </ListItemIcon>
            <div>{data?.lastname}</div>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <ListItemIcon>
              <FormattedMessage id="userName" />
            </ListItemIcon>
            <div>{data?.username}</div>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.li}>
            <ListItemIcon>
              <FormattedMessage id="email" />
            </ListItemIcon>
            <div>{data?.email}</div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Container>
    </Page>
  )
}
