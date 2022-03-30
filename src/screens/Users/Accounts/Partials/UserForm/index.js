import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link as RouterLink} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function UserForm({onSubmit}) {
  const {isLoading, isError, error, run} = useAsync()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  })

  const onSubmitForm = data => {
    const {email, password} = data
    // run(onSubmit({email, password}))
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <Uploader
          name="avatar"
          InputChange={e => console.log('e', e)}
          label="Avatar"
          width="100%"
          accept={['image/*']}
          aspectRatio="1:1"
          multiple={false}
          maxFileSize={30}
        />
        <CustomInput
          label="User Name"
          name="username"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Email address"
          name="email"
          control={control}
          errors={errors}
        />
        <InputPassword
          label="New Password"
          name="new_password"
          control={control}
          errors={errors}
        />
        <RichText
          label="Description"
          name="description"
          width="100%"
          InputChange={e => console.log('e', e)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Create User
        </LoadingButton>
      </Stack>
    </form>
  )
}
