import {useAsyncDebounce} from 'react-table'
import React from 'react'
import {InputAdornment, OutlinedInput, TextField} from '@mui/material'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {width: 320, boxShadow: theme.customShadows.z8},
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <SearchStyle
      value={value || ''}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`${count} records...`}
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{color: 'text.disabled'}} />
        </InputAdornment>
      }
    />
  )
}
