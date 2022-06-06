import {Autocomplete, CircularProgress, TextField} from '@mui/material'
import {useAuth, useClient} from 'context/auth-context'
import React, {useState, useEffect} from 'react'
import {Controller} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import useStyles from './style'

export default function Dropdown({
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
  options,
  handleChange,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
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
          options={options}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label={<FormattedMessage id={title} />}
                className={classes.input}
                helperText={errors[name] && `${name} is a required field`}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                onChange={onChange}
              />
            )
          }}
          onChange={(event, values, reason) => handleChange(values)}
          value={value}
        />
      )}
    />
  )
  // <Controller
  //   render={({field: {onChange, value}}) => (
  //     <Autocomplete
  //       sx={{flexBasis: !!width ? width : '100%'}}
  //       options={options}
  //       onChange={(_, data) => {
  //         setValue(name, data)
  //       }}
  //       renderInput={params => (
  //         <TextField
  //           {...params}
  //           label={<FormattedMessage id={title} />}
  //           className={classes.input}
  //           helperText={errors[name] && `${name} is a required field`}
  //           InputProps={{
  //             ...params.InputProps,
  //             endAdornment: (
  //               <React.Fragment>
  //                 {params.InputProps.endAdornment}
  //               </React.Fragment>
  //             ),
  //           }}
  //         />
  //       )}
  //     />
  //   )}
  //   name={name}
  //   control={control}
  //   defaultValue={editValue ? editValue : ''}
  // />
}
