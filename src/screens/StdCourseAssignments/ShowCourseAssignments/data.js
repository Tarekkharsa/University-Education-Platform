import CourseAssignmentMoreMenu from 'sections/@dashboard/courses/CourseAssignmentMoreMenu'
import StdCourseAssignmentMoreMenu from 'sections/@dashboard/courses/StdCourseAssignmentMoreMenu'

export const tableHiddenColumns = ['cmid']
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
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <StdCourseAssignmentMoreMenu id={row.original.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
