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

export default function RoleForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const RoleSchema = Yup.object().shape({
    role_ids: Yup.array(),
  })
  const [ritchText, setRitchText] = useState('')

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => client(`getUserById?id=${id}`).then(data => data.data),
    enabled: id !== undefined,
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      role_ids: [
        {
          id: 1,
          name: 'ROLE_ADMIN',
        },
        {
          id: 2,
          name: 'ROLE_MANAGER',
        },
      ],
    },
  })

  useEffect(() => {
    if (user && id !== undefined) {
      setValue('role_ids', user.roles)
      reset({role_ids: user.roles})
    }
  }, [user])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? `cohorts/${id}` : `cohorts`, {
        method: id ? 'PATCH' : 'POST',
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
    console.log('data', data)
    // mutate(data)
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <Dropdown
          name={'role_ids'}
          title={'User Roles'}
          optionLable={'name'}
          optionUrl={'getAllRoles'}
          errors={errors}
          control={control}
          setValue={setValue}
          editValue={[
            {
              id: 1,
              name: 'ROLE_ADMIN',
            },
            {
              id: 2,
              name: 'ROLE_MANAGER',
            },
          ]}
          multiple
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/users/Roles')}
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
          {id ? 'Update Cohort' : 'Create Cohort'}
        </LoadingButton>
      </Stack>
    </form>
  )
}
