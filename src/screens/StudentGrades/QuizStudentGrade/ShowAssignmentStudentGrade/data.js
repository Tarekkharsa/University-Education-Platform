import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'
import {Link as RouterLink} from 'react-router-dom'
import Marks from './marks'

export const tableHiddenColumns = ['coursemodule']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'cmid',
    disableFilters: true,
  },
  {
    Header: 'name',
    accessor: 'name',
    disableFilters: true,
  },
  // {
  //   Header: 'section',
  //   accessor: 'section',
  //   disableFilters: true,
  // },
  {
    Header: 'Assignment Grade',
    accessor: 'actions',
    Cell: ({row}) => {
      return <Marks quiz_id={row} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
