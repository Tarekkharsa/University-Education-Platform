import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function GroupForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const GroupSchema = Yup.object().shape({
    name: Yup.string().required(<FormattedMessage id="group_name_required" />),
    description: Yup.string(),
  })

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(GroupSchema),
    defaultValues: {name: '', description: ''},
  })

  const {
    isFetching: fetchLoading,
    error: getOneError,
    data: group,
  } = useQuery({
    queryKey: 'group',
    queryFn: () =>
      client(`group/getGroupById?group_id=${id}`).then(data => data.data[0]),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (group && id !== undefined) {
      reset(group)
    }
  }, [group])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? 'group/update' : `group/create`, {
        method: 'POST',
        data: data,
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('groups')
        navigate(-1)
        reset()
      },
    },
  )

  const onSubmitForm = data => {
    let {name, description} = data
    mutate({
      name,
      description,
      visible: 1,
      is_system: true,
      group_id: id ? id : undefined,
    })
  }

  if (fetchLoading) {
    return <FullPageSpinner />
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={3}>
        {isError ? <Alert severity="error">{error.message}</Alert> : null}

        <CustomInput
          label="group_name"
          name="name"
          control={control}
          errors={errors}
        />
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, value}}) => (
            <RichText
              label="Description"
              errorText={errors ? errors?.description?.message : ''}
              width="100%"
              InputChange={values => onChange(values)}
              value={value}
              editValue={value}
            />
          )}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/groups')}
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
            <FormattedMessage id="update_group" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
