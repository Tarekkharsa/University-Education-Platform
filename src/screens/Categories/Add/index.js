import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import CategoryForm from '../Partials/CategoryForm'

export default function AddCategory() {
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
            Create New Category
          </Typography>
        </Stack>
        <CategoryForm />
      </Container>
    </Page>
  )
}
