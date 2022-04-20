import {Avatar, Stack, Typography} from '@mui/material'
import {sentenceCase} from 'change-case'
import {UserMoreMenu} from 'sections/@dashboard/user'
import Label from 'components/Label'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'Cohort ID',
    accessor: 'id',
    disableFilters: true,
  },
  // {
  //   Header: 'Category',
  //   accessor: 'category',
  // },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    accessor: 'actions',
    Cell: ({row}) => {
      return <UserMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
