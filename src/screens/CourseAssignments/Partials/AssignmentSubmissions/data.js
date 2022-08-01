import SetGrade from './SetGrade'
import ShowFile from './ShowFile'

export const tableHiddenColumns = []
export const tableColumns = [
  {
    Header: 'userName',
    accessor: 'user.username',
    disableFilters: true,
  },
  {
    Header: 'submitted',
    accessor: 'gradingstatus',
  },
  {
    Header: 'file',
    accessor: 'plugins[0]?.fileareas[0].files[0]?.filename',
    Cell: ({row}) => {
      return (
        <ShowFile file={row?.original?.plugins[0]?.fileareas[0].files[0]} />
      )
    },
  },
  {
    Header: 'actions',
    accessor: 'actions',
    Cell: ({row}) => {
      return row.values.gradingstatus === 'notgraded' ? (
        <SetGrade user={row?.original?.user} />
      ) : (
        ''
      )
    },
    style: {
      textAlign: 'right',
    },
  },
]
