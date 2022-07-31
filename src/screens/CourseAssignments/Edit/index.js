import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink, useParams} from 'react-router-dom'
import AssignmentForm from '../Partials/AssignmentForm'

export default function EditAssignment() {
  return (
    <Page title="Course">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="update_course" />
          </Typography>
        </Stack>
        <AssignmentForm />
      </Container>
    </Page>
  )
}
