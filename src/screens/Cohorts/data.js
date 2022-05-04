import {Avatar, Stack, Typography} from '@mui/material'
import {sentenceCase} from 'change-case'
import {CohortMoreMenu} from 'sections/@dashboard/user'
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
    Header: 'name',
    accessor: 'name',
  },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <CohortMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
