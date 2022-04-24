import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link as RouterLink} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function LoginForm({onSubmit}) {
  const {isLoading, isError, error, run} = useAsync()

  const LoginSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email('Email must be a valid email address')
    //   .required('Email is required'),

    username: Yup.string().required('User Name is required'),
    password: Yup.string().required('Password is required'),
  })

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: true,
    },
  })

  const onSubmitForm = data => {
    const {username, password} = data
    run(onSubmit({username, password}))
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <CustomInput
          label="User name"
          name="username"
          control={control}
          errors={errors}
        />
        <InputPassword
          label="Password"
          name="password"
          control={control}
          errors={errors}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{my: 2}}
      >
        <CustomCheckbox
          label="Remember me"
          name="remember"
          control={control}
          errors={errors}
        />
        <Link
          component={RouterLink}
          variant="subtitle2"
          to="#"
          underline="hover"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </form>
  )
}
