import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import CohortForm from '../Partials/CohortForm'

export default function EditCohort() {
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
            Update Cohort
          </Typography>
        </Stack>
        <CohortForm />
      </Container>
    </Page>
  )
}
