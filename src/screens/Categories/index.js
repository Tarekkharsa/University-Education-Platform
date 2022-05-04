// material
import {Button, Container, Stack, Typography} from '@mui/material'
import {useTheme} from '@mui/styles'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink} from 'react-router-dom'
import Table from './Table'

// ----------------------------------------------------------------------

export default function Categories() {
  const theme = useTheme()
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
            <FormattedMessage id="categories" />
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/categories/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_parant_category" />
          </Button>
        </Stack>
        <Table />
      </Container>
    </Page>
  )
}
