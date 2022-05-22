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
import {FormattedMessage} from 'react-intl'

const getChildRows = (row, rows) => {
  const childRows = rows.filter(r => r.parent === (row ? row.id : 0))
  return childRows.length ? childRows : null
}

export default function TreeTable({setValue, editValue}) {
  const [selection, setSelection] = useState([editValue])
  const disableCategoriesArray = [
    8, 7, 16, 17, 6, 5, 14, 15, 4, 12, 9, 13, 10, 11,
  ]
  const disableCheckbox = row => {
    return disableCategoriesArray.includes(row.id)
  }
  const checkedCheckbox = row => {
    return row.id === editValue
  }

  const TreeCheckboxCell = props => {
    const {children, ...restProps} = props
    const newChildren = React.Children.map(children, (child, index) => {
      if (index !== 2) return child
      return React.cloneElement(child, {
        ...child.props,
        checked: true,
      })
    })

    return (
      <TableTreeColumn.CheckboxProps {...restProps}>
        {newChildren}
      </TableTreeColumn.CheckboxProps>
    )
  }
  const TreeCell = props => {
    const {children, ...restProps} = props
    const newChildren = React.Children.map(children, (child, index) => {
      if (index !== 2) return child
      return React.cloneElement(child, {
        ...child.props,
        disabled: disableCheckbox(props.row),
      })
    })

    return (
      <TableTreeColumn.Cell {...restProps}>{newChildren}</TableTreeColumn.Cell>
    )
  }
  const [columns] = useState([
    // {name: 'id', title: 'ID'},
    {
      name: 'name',
      title: <FormattedMessage id="name" />,
    },
    // {
    //   name: 'actions',
    //   title: <FormattedMessage id="actions" />,
    //   getCellValue: row => <CategoryActions row={row} />,
    // },
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
    // {columnName: 'actions'},
  ])
  const [defaultHiddenColumnNames] = useState([])
  const [tableColumnExtensions] = useState([
    {columnName: 'description', align: 'right'},
  ])

  const onSelectionChange = selection => {
    console.log('selection', selection)
    setSelection(selection)
  }

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SelectionState
          defaultSelection={[editValue]}
          onSelectionChange={onSelectionChange}
        />
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <IntegratedSelection />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn
          for="name"
          showSelectionControls
          cellComponent={TreeCell}
          checkboxComponent={TreeCheckboxCell}
        />
      </Grid>
    </Paper>
  )
}
