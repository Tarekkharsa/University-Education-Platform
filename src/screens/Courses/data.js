import CourseMoreMenu from 'sections/@dashboard/courses/CourseMoreMenu'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'Course ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'fullname',
    accessor: 'fullname',
  },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return <CourseMoreMenu id={row.values.id} />
    },
    style: {
      textAlign: 'right',
    },
  },
]
