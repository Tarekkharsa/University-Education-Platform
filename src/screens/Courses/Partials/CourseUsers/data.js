import {Avatar, Stack, Typography} from '@mui/material'
import {evaluateChips} from 'components/Form/components/Uploader/Partials/Service/Helpers'
import {UserRoleMoreMenu} from 'sections/@dashboard/user'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'firstName',
    accessor: 'firstname',
    disableFilters: true,

    Cell: ({row}) => {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={row.original.firstname} src={row.original.image} />
          <Typography variant="subtitle2" noWrap>
            {row.original.firstname}
          </Typography>
        </Stack>
      )
    },
  },
  {
    Header: 'email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    Header: 'roles',
    accessor: 'roles',
    disableFilters: true,
    Cell: ({row}) => {
      return evaluateChips(row.original.roles)
    },
    style: {
      flexDirection: 'column',
      display: 'flex',
    },
  },
]
