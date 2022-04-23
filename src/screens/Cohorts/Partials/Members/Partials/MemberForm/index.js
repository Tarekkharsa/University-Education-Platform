import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import Dropdown from 'components/Form/components/Dropdown'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function MemberForm({handleClose}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const CohortSchema = Yup.object().shape({
    user_id: Yup.string().required('User is required'),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CohortSchema),
    defaultValues: {user_id: ''},
  })

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? `cohorts/${id}` : `cohorts`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('cohorts')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    mutate(data)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <Dropdown
          name={'User'}
          title={'User'}
          optionLable={'name'}
          optionUrl={'users-data'}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={handleClose}
          size="large"
          type="submit"
          variant="contained"
          sx={{mr: 2}}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
}
