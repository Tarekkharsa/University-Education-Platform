import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function ProfileForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    password: !id ? Yup.string().required('Password is required') : '',
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
    enabled: id !== undefined,
  })
  useEffect(() => {
    if (user && id !== undefined) {
      const firstname = user.firstName
      const lastname = user.lastName
      const username = user.username
      const email = user.email

      reset({firstname, lastname, username, email})
    }
  }, [user])
  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? 'updateUser' : `createUser`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('users')
        navigate(-1)
        reset()
      },
    },
  )
  const onSubmitForm = data => {
    let {firstname, lastname, username, email, password} = data
    mutate({
      firstname,
      lastname,
      username,
      email,
      password: id ? undefined : password,
      user_id: id ? id : undefined,
    })
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
          label="First Name"
          name="firstname"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Last Name"
          name="lastname"
          control={control}
          errors={errors}
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
        {id === undefined && (
          <InputPassword
            label="Password"
            name="password"
            control={control}
            errors={errors}
          />
        )}
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
          {id !== undefined ? 'Update User' : 'Create User'}
        </LoadingButton>
      </Stack>
    </form>
  )
}
