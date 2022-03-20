import * as Yup from 'yup'
import {useState} from 'react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup' // material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material'
import {LoadingButton} from '@mui/lab'
// component
import Iconify from '../../../components/Iconify'
import {ErrorMessage} from 'components/lib'
import {useAsync} from 'utils/hooks'

// ----------------------------------------------------------------------

export default function LoginForm({onSubmit}) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
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

  const handleShowPassword = () => {
    setShowPassword(show => !show)
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
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
              autoComplete="username"
              type="text"
              label="Email address"
              error={Boolean(errors.email && errors.email)}
              helperText={errors.email && errors.email.message}
            />
          )}
          name="username"
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
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}
