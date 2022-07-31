import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink} from 'react-router-dom'
import QuizForm from '../Partials/QuizForm'

export default function AddQuiz() {
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
            <FormattedMessage id="new_quiz" />
          </Typography>
        </Stack>
        <QuizForm />
      </Container>
    </Page>
  )
}
