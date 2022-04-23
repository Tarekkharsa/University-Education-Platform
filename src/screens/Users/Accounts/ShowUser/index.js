import {
  Avatar,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
import Page from 'components/Page'
import {useClient} from 'context/auth-context'
import React from 'react'
import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'
import useStyles from './styles'
import ReactHtmlParser from 'react-html-parser'

export default function ShowUser() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'user',
    queryFn: () => client(`users/${id}`).then(data => data),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
        </Stack>

        <List className={classes.root}>
          <ListItem button className={classes.li}>
            <ListItemIcon>Image</ListItemIcon>

            <ListItemAvatar>
              <IconButton
                onClick={() => window.open('https://www.google.com', '_blank')}
              >
                <Avatar
                  className={classes.large}
                  alt=""
                  src={'https://www.google.com'}
                />
              </IconButton>
            </ListItemAvatar>
          </ListItem>
          <Divider variant="inset" component="li" />

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

          <ListItem button className={classes.li}>
            <ListItemIcon>Product Link</ListItemIcon>
            <div>link</div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Container>
    </Page>
  )
}
