import CourseAssignmentMoreMenu from 'sections/@dashboard/courses/CourseAssignmentMoreMenu'

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
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <CourseAssignmentMoreMenu id={row.original.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
