import JoinAction from './Partials/JoinAction'

export const tableHiddenColumns = ['id']
export const tableColumns = [
  {
    Header: 'meetingName',
    accessor: 'meetingName',
  },
  {
    Header: 'joinMeeting',
    accessor: 'meetingID',
    disableSortBy: true,
    Cell: props => <JoinAction value={props.value} row={props.row} />,
  },
]
