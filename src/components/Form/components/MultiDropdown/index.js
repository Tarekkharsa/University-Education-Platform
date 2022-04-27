/* eslint-disable no-use-before-define */
import {Controller} from 'react-hook-form'
import useStyles from './style'
import {Autocomplete, CircularProgress, TextField} from '@mui/material'
import {useAuth, useClient} from 'context/auth-context'
import React, {useState, useEffect} from 'react'

export default function MultiSelect({
  title,
  setValue,
  editValue,
  name,
  width,
  optionUrl,
  control,
  optionLable,
  errors,
  multiple = false,
  onChange,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const {uesr} = useAuth()
  const loading = open && options.length === 0
  const client = useClient()

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }
    ;(async () => {
      const response = await client(optionUrl)
      const countries = response.data
      if (active) {
        setOptions(countries)
      }
    })()
    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Controller
      control={control}
      name={'role_ids'}
      render={({field: {onChange, value}}) => (
        <Autocomplete
          multiple={multiple}
          sx={{flexBasis: !!width ? width : '100%'}}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          loading={loading}
          options={options}
          isOptionEqualToValue={(option, value) =>
            option[optionLable] === value[optionLable]
          }
          getOptionLabel={option => option[optionLable]}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label={title}
                className={classes.input}
                helperText={errors[name] && `${name} is a required field`}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                onChange={onChange}
              />
            )
          }}
          onChange={(event, values, reason) => onChange(values)}
          value={value}
        />
      )}
    />
  )
}
