import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import MultiSelect from 'components/Form/components/MultiDropdown'
import MultiDropdown from 'components/Form/components/MultiDropdown'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
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
    isFetching: fetchLoading,
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
    defaultValues: {role_ids: []},
  })

  useEffect(() => {
    if (user && id !== undefined) {
      reset({role_ids: user.roles})
    }
  }, [user])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(`assignRole`, {
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
    let role_ids = data.role_ids.map(role => role.id)
    mutate({role_ids, user_id: id})
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <MultiSelect
          name={'role_ids'}
          title={'user_roles'}
          optionLable={'name'}
          optionUrl={'getAllRoles'}
          errors={errors}
          control={control}
          onChange={value => setValue('role_ids', value)}
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
          <FormattedMessage id="cancel" />
        </LoadingButton>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          {id ? (
            <FormattedMessage id="update_role" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
