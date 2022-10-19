import {Avatar, Stack, Typography} from '@mui/material'
import Label from 'components/Label'
import {FormattedMessage} from 'react-intl'
import {UserMoreMenu} from 'sections/@dashboard/user'
import SwitchAction from './Partials/SwitchAction'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'id',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'userName',
    accessor: 'username',
    disableFilters: true,
    style: {
      padding: '0',
    },
    Cell: ({row}) => {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={row.original.username} src={row.original.image} />
          <Typography variant="subtitle2" noWrap>
            {row.original.username}
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
    Header: 'status',
    accessor: 'status',
    disableSortBy: true,
    Cell: props => {
      return props.value !== 2 ? (
        <SwitchAction value={props.value} row={props.row} />
      ) : (
        <Label variant="ghost" color={'success'}>
          <FormattedMessage id="active" />
        </Label>
      )
    },
  },
  {
    Header: 'actions',

    accessor: 'actions',
    Cell: ({row}) => {
      return <UserMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
