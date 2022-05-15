export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'name',
    accessor: 'name',
    disableFilters: true,
  },
  {
    Header: 'section',
    accessor: 'section',
    disableFilters: true,
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
