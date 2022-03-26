import {IconButton, InputAdornment, TextField} from '@mui/material'
import Iconify from 'components/Iconify'
import React, {useState} from 'react'
import {Controller} from 'react-hook-form'

function InputPassword({control, errors, name, label}) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(show => !show)
  }

  return (
    <Controller
      render={({
        field: {onChange, onBlur, value, name, ref},
        fieldState: {invalid, isTouched, isDirty, error},
      }) => (
        <TextField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password && errors.password)}
          helperText={errors.password && errors.password.message}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default InputPassword
