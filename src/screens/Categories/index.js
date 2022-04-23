// material
import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {Link as RouterLink} from 'react-router-dom'
import Table from './Table'

// ----------------------------------------------------------------------

export default function Categories() {
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
            Category
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/categories/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Parent Category
          </Button>
        </Stack>
        <Table />
      </Container>
    </Page>
  )
}
