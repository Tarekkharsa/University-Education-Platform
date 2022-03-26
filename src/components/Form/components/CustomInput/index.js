import React from 'react'
import {Controller} from 'react-hook-form'
import {TextField} from '@mui/material'

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
          label={label}
          error={Boolean(errors.email && errors.email)}
          helperText={errors.email && errors.email.message}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default CustomInput
