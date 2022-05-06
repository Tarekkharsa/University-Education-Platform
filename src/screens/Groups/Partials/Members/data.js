import {Avatar, Stack, Typography} from '@mui/material'
import {sentenceCase} from 'change-case'
import {MemberMoreMenu} from 'sections/@dashboard/user'
import Label from 'components/Label'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'userName',
    accessor: 'username',
    disableFilters: true,
  },
  {
    Header: 'email',
    accessor: 'email',
    disableFilters: true,
  },
  // {
  //   Header: 'User name',
  //   accessor: 'username',
  //   style: {
  //     padding: '0',
  //   },
  //   Cell: ({row}) => {
  //     return (
  //       <Stack direction="row" alignItems="center" spacing={2}>
  //         <Avatar alt={row.original.name} src={row.original.avatarUrl} />
  //         <Typography variant="subtitle2" noWrap>
  //           {row.original.name}
  //         </Typography>
  //       </Stack>
  //     )
  //   },
  // },
  // {
  //   Header: 'Company',
  //   accessor: 'company',
  // },
  // {
  //   Header: 'Role',
  //   accessor: 'role',
  // },
  // {
  //   Header: 'Verified',
  //   accessor: 'isVerified',
  //   Cell: ({row}) => {
  //     return row.original.isVerified ? 'Yes' : 'No'
  //   },
  // },
  // {
  //   Header: 'Status',
  //   accessor: 'status',
  //   Cell: ({row}) => {
  //     return (
  //       <Label
  //         variant="ghost"
  //         color={(row.original.status === 'banned' && 'error') || 'success'}
  //       >
  //         {sentenceCase(row.original.status)}
  //       </Label>
  //     )
  //   },
  // },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <MemberMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
