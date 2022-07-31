export const tableHiddenColumns = []
export const tableColumns = [
  {
    Header: 'userName',
    accessor: 'user.username',
    disableFilters: true,
  },
  {
    Header: 'grade',
    accessor: 'grade',
  },
  // {
  //   Header: 'actions',
  //   accessor: 'actions',
  //   Cell: ({row}) => {
  //     return <MemberMoreMenu id={row.values.id} />
  //   },
  //   style: {
  //     textAlign: 'right',
  //   },
  // },
]
