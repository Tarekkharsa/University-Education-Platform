import {Avatar, Stack, Typography} from '@mui/material'
import {sentenceCase} from 'change-case'
import {GroupMoreMenu} from 'sections/@dashboard/user'
import Label from 'components/Label'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'Group ID',
    accessor: 'id',
    disableFilters: true,
  },
  // {
  //   Header: 'Category',
  //   accessor: 'category',
  // },
  {
    Header: 'name',
    accessor: 'name',
  },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <GroupMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
