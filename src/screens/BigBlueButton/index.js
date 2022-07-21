// material

import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import useBBB from 'hooks/useBBB'
import {FormattedMessage} from 'react-intl'

export default function BigBlueButton() {
  const {create, join, getMeetings} = useBBB()

  return (
    <Page title="BigBlueButton">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="BigBlueButton" />
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          mb={5}
        >
          <Button
            variant="contained"
            onClick={() => getMeetings()}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <FormattedMessage id="new_event" />
          </Button>
        </Stack>
      </Container>
    </Page>
  )
}
