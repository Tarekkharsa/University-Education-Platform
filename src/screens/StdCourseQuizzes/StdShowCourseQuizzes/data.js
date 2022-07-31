import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'
import {Link as RouterLink} from 'react-router-dom'

export const tableHiddenColumns = ['coursemodule']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'coursemodule',
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
    Header: 'Start Exam',
    accessor: 'actions',
    Cell: ({row}) => {
      return (
        <IconButton component={RouterLink} to={`${row.original.id}/quiz-info`}>
          <Iconify
            icon="healthicons:i-exam-multiple-choice-outline"
            width={24}
            height={24}
          />
        </IconButton>
      )
    },
    style: {
      textAlign: 'right',
    },
  },
]
