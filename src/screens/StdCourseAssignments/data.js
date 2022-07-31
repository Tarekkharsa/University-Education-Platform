import {IconButton} from '@mui/material'
import Iconify from 'components/Iconify'
import CourseMoreMenu from 'sections/@dashboard/courses/CourseMoreMenu'
import {Link as RouterLink, useNavigate} from 'react-router-dom'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'Course ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'name',
    accessor: 'fullname',
  },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return (
        <IconButton component={RouterLink} to={`${row.values.id}/show`}>
          <Iconify icon="carbon:view" width={24} height={24} />
        </IconButton>
      )
    },
    style: {
      textAlign: 'right',
    },
  },
]
