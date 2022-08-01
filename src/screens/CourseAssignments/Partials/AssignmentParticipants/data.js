import SetGrade from './SetGrade'

export const tableHiddenColumns = []
export const tableColumns = [
  {
    Header: 'userName',
    accessor: 'user.username',
    disableFilters: true,
  },
  {
    Header: 'submitted',
    accessor: 'submitted',
    Cell: ({value}) => {
      return <span>{value ? 'Yes' : 'No'}</span>
    },
  },
  // {
  //   Header: 'actions',
  //   accessor: 'actions',
  //   Cell: ({row}) => {
  //     return row.values.submitted ? <SetGrade user={row?.original?.user} /> : ''
  //   },
  //   style: {
  //     textAlign: 'right',
  //   },
  // },
]
