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

export default function ShowCategoty() {
  const classes = useStyles()
  const {id} = useParams()
  const client = useClient()
  const {isLoading, error, data} = useQuery({
    queryKey: 'category',
    queryFn: () =>
      client(`getCategories?key=id&value=${id}`).then(data => data.data[0]),
  })

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Page title="Category">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="category_details" />
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/categories/${id}/edit`}
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            <FormattedMessage id="edit_category" />
          </Button>
        </Stack>

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
            <div>{ReactHtmlParser(data?.description)}</div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Container>
    </Page>
  )
}
