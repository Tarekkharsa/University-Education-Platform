import React from 'react'
import {Controller} from 'react-hook-form'
import {TextField} from '@mui/material'
import {FormattedMessage} from 'react-intl'

const CustomInput = ({name, label, control, errors}) => {
  return (
    <Controller
      render={({
        field: {onChange, onBlur, value, ref},
        fieldState: {invalid, isTouched, isDirty, error},
      }) => (
        <TextField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          fullWidth
          autoComplete={name}
          type="text"
          label={<FormattedMessage id={label} />}
          error={Boolean(errors[name] && errors[name])}
          helperText={errors[name] && errors[name].message}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default CustomInput
