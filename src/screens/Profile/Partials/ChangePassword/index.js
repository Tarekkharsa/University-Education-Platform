import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Link, Stack} from '@mui/material'
import CustomCheckbox from 'components/Form/components/CustomCheckbox'
import CustomInput from 'components/Form/components/CustomInput'
import InputPassword from 'components/Form/components/InputPassword'
import RichText from 'components/Form/components/RichText'
import Uploader from 'components/Form/components/Uploader'
import {useAuth, useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom'
import {useAsync} from 'utils/hooks'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const {user: userAuth} = useAuth()
  const id = userAuth.id
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const PasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old Password is required'),
    new_password: Yup.string().required('New Password is required'),
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client('changeUserPassword', {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        reset()
      },
    },
  )
  const onSubmitForm = data => {
    mutate(data)
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}
        <InputPassword
          label="old_password"
          name="old_password"
          control={control}
          errors={errors}
        />
        <InputPassword
          label="new_password"
          name="new_password"
          control={control}
          errors={errors}
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
          <FormattedMessage id="save" />
        </LoadingButton>
      </Stack>
    </form>
  )
}
