// material
import {Button, Container, Stack, Typography} from '@mui/material'
import ReactTable from 'components/ReactTable'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Iconify from 'components/Iconify'
// components
import Page from 'components/Page'
import {UserMoreMenu} from 'sections/@dashboard/user'
//
import USERLIST from '_mocks_/user'
import categoriesLIST from '_mocks_/categories'
import {tableColumns, tableHiddenColumns} from './data'
import {queryCache, useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from 'context/auth-context'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useTheme} from '@mui/styles'
import {FormattedMessage} from 'react-intl'

// ----------------------------------------------------------------------

export default function StdBigBlueButton() {
  const theme = useTheme()
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])
  const [rows, setRows] = useState([])
  let selectedRowsIds = []

  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'Meetings',
    queryFn: () =>
      client('bigBlueButton/getMeetings').then(data => [
        {
          returncode: 'SUCCESS',
          meetingID: 'random-6565792',
          meetingName: 'test',
          internalMeetingID:
            'd7f54653123c63d5869bbe4d6b836ca563a15113-1658409621476',
          attendeePW: 'ap',
          moderatorPW: 'mp',
          metadata: '',
          attendees: [],
          createTime: 1658409621476,
          startTime: 1658409621483,
          voiceBridge: 731099204,
          dialNumber: '18632080022',
          createDate: 'Thu Jul 21 13:20:21 UTC 2022',
          duration: 20,
          breakout: false,
        },
      ]),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="BigBlueButton">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="bbb" />
          </Typography>
        </Stack>
        <ReactTable
          columns={columns}
          hiddenColumns={hiddenColumns}
          data={data}
          loading={isLoading}
          totalRecords={data?.length}
        />
      </Container>
    </Page>
  )
}
