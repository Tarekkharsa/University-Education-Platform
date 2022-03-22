import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from '@mui/material'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Link as RouterLink} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'
// component
import Iconify from '../../../components/Iconify'

// ----------------------------------------------------------------------

export default function LoginForm({onSubmit}) {
  const [showPassword, setShowPassword] = useState(false)
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
    run(onSubmit({email, password}))
  }

  const handleShowPassword = () => {
    setShowPassword(show => !show)
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <Controller
          render={({
            field: {onChange, onBlur, value, name, ref},
            fieldState: {invalid, isTouched, isDirty, error},
          }) => (
            <TextField
              value={value}
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched
              inputRef={ref} // wire up the input ref
              fullWidth
              autoComplete="email"
              type="text"
              label="Email address"
              error={Boolean(errors.email && errors.email)}
              helperText={errors.email && errors.email.message}
            />
          )}
          name="email"
          control={control}
        />

        <Controller
          render={({
            field: {onChange, onBlur, value, name, ref},
            fieldState: {invalid, isTouched, isDirty, error},
          }) => (
            <TextField
              value={value}
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched
              inputRef={ref} // wire up the input ref
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password && errors.password)}
              helperText={errors.password && errors.password.message}
            />
          )}
          name="password"
          control={control}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{my: 2}}
      >
        <Controller
          name="remember"
          control={control}
          render={({field}) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={e => field.onChange(e.target.checked)}
                  checked={field.value}
                />
              }
              label="Remember me"
            />
          )}
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
