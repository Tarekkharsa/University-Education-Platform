import {Avatar, Stack, Typography} from '@mui/material'
import {sentenceCase} from 'change-case'
import {UserMoreMenu} from 'sections/@dashboard/user'
import Label from 'components/Label'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'Category name',
    accessor: 'category_name',
  },
  {
    Header: 'Parent category',
    accessor: 'Parent_category',
  },
  {
    Header: 'Category ID Number',
    accessor: 'category_id',
  },
  {
    accessor: 'actions',
    Cell: ({row}) => {
      return <UserMoreMenu />
    },
    style: {
      textAlign: 'right',
    },
  },
]
