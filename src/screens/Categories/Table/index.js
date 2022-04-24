import React, {useState} from 'react'
import Paper from '@mui/material/Paper'
import {
  DataTypeProvider,
  TreeDataState,
  SortingState,
  SelectionState,
  FilteringState,
  PagingState,
  CustomTreeData,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableTreeColumn,
  PagingPanel,
  TableColumnResizing,
  Toolbar,
  TableColumnVisibility,
  ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui'

import CategoryActions from 'sections/@dashboard/categories/CategoryActions'
import {useQuery} from 'react-query'
import {useClient} from 'context/auth-context'
import {FullPageSpinner} from 'components/lib'

const getChildRows = (row, rows) => {
  const childRows = rows.filter(r => r.parent === (row ? row.id : 0))
  return childRows.length ? childRows : null
}

export default function TreeTable() {
  const [columns] = useState([
    // {name: 'id', title: 'ID'},
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'actions',
      title: 'actions',
      getCellValue: row => <CategoryActions row={row} />,
    },
  ])

  const client = useClient()

  const {
    isLoading,
    error,
    data: rows,
  } = useQuery({
    queryKey: 'categories',
    queryFn: () => client('getCategories').then(data => data.data),
  })

  // const [rows] = useState(categories)
  const [pageSizes] = useState([5, 10, 20])
  const [defaultColumnWidths] = useState([
    // {columnName: 'id', width: 10},
    {columnName: 'name'},
    {columnName: 'actions'},
  ])
  const [defaultHiddenColumnNames] = useState([])
  const [tableColumnExtensions] = useState([
    {columnName: 'description', align: 'right'},
  ])

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SelectionState />
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <IntegratedSelection />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" showSelectionControls showSelectAll />
      </Grid>
    </Paper>
  )
}
