import {Chip} from '@mui/material'

export const parseEditValue = editValue => {
  let arr = []
  let newEditValue = []

  if (Array.isArray(editValue)) {
    newEditValue = editValue
  } else if (editValue && editValue != '') {
    arr.push(editValue)
    newEditValue = arr
  }

  return newEditValue
}

export const isJson = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export const evaluateChips = (values, styles) => {
  let chips = []
  if (!isEmpty(values))
    values.map(object => {
      chips.push(
        <Chip style={!styles ? {margin: '5px'} : styles} label={object.name} />,
      )
    })
  return chips
}
