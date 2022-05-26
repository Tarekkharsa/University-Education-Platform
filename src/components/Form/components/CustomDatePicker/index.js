import React from 'react'
import {Controller} from 'react-hook-form'
import {TextField} from '@mui/material'
import {FormattedMessage} from 'react-intl'
import {LocalizationProvider, DatePicker} from '@mui/lab'
import moment from 'moment'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
const CustomDatePicker = ({name, label, control, errors}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        // defaultValue={null}
        render={({field: {onChange, value}, fieldState: {error, invalid}}) => (
          <DatePicker
            label={<FormattedMessage id={label} />}
            value={value}
            onChange={value => onChange(value)}
            renderInput={params => (
              <TextField
                {...params}
                helperText={invalid ? error.message : null}
                error={invalid}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker
