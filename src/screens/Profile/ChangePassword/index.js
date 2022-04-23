import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import UserForm from 'screens/Users/Accounts/Partials/UserForm'

export default function ChangePassword() {
  return (
    <Page title="Change Password">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            edit User
          </Typography>
        </Stack>
        <UserForm />
      </Container>
    </Page>
  )
}
