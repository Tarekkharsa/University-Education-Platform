import React from 'react'
import {useForm} from 'react-hook-form'
import useStyles from './style'
import {yupResolver} from '@hookform/resolvers/yup'
import {useMediaQuery, useTheme} from '@mui/material'

function Form({
  template,
  schema,
  onSubmit,
  customClasses,
  customStyle,
  editValues,
  wrapper,
  children,
  ...rest
}) {
  const classes = useStyles()
  const theme = useTheme()

  const smScreen = useMediaQuery(theme.breakpoints.down('sm'))

  let {
    register,
    handleSubmit,
    errors,
    control,
    clearErrors,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editValues ? editValues : {},
  })

  let {fields} = template

  const renderFields = fields => {
    return fields.map(field => {
      let {type, name} = field

      let fieldProps = {
        ...field,
        width: smScreen ? '100%' : field.width,
      }

      switch (type) {
        case 'text':
          return (
            <CustomInput
              key={name}
              fieldProps={fieldProps}
              errors={errors}
              register={register}
            />
          )
        case 'phone':
          return (
            <PhoneNumInput
              key={name}
              fieldProps={fieldProps}
              errors={errors}
              register={register}
              control={control}
            />
          )
        case 'passowrd':
          return (
            <InputPassword
              key={name}
              fieldProps={fieldProps}
              errors={errors}
              register={register}
            />
          )
        case 'dropdown':
          return (
            <Dropdown
              key={name}
              fieldProps={fieldProps}
              errors={errors}
              register={register}
              control={control}
            />
          )
        case 'file':
          return (
            <FileUpload
              key={name}
              fieldProps={fieldProps}
              errors={errors}
              register={register}
              control={control}
              clearErrors={clearErrors}
              setError={setError}
              setValue={setValue}
            />
          )
        default:
          return (
            <div key={name}>
              <span className="red-text">Invalid Field</span>
            </div>
          )
      }
    })
  }

  return (
    <form {...rest} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <div
          className={classes.formWrapper}
          style={!!customStyle ? {...customStyle} : {}}
        >
          {renderFields(fields)}
        </div>
        {children}
      </div>
    </form>
  )
}

export default Form
