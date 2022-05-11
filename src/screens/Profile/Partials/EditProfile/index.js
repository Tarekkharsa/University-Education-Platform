import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink, useParams} from 'react-router-dom'
import ProfileForm from '../ProfileForm'

export default function EditProfile() {
  return (
    <Page title="Profile">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="update_profile" />
          </Typography>
        </Stack>
        <ProfileForm />
      </Container>
    </Page>
  )
}
