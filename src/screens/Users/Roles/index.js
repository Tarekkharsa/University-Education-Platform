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
import categoriesLIST from '_mocks_/categories'
import {tableColumns, tableHiddenColumns} from './data'
import {queryCache, useMutation, useQuery, useQueryClient} from 'react-query'
import {useAuth} from 'context/auth-context'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {FormattedMessage} from 'react-intl'

// ----------------------------------------------------------------------

export default function Roles() {
  const columns = useMemo(() => tableColumns, [])
  const hiddenColumns = useMemo(() => tableHiddenColumns, [])

  const client = useClient()
  const queryClient = useQueryClient()

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: 'users',
    queryFn: () => client('getAllUsers').then(data => data.data),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Users | Roles">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="users_roles" />
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
