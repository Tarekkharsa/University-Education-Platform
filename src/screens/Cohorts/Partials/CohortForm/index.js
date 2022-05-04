import {yupResolver} from '@hookform/resolvers/yup' // material
import {LoadingButton} from '@mui/lab'
import {Alert, Stack} from '@mui/material'
import CustomInput from 'components/Form/components/CustomInput'
import RichText from 'components/Form/components/RichText'
import {FullPageSpinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormattedMessage} from 'react-intl'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function CohortForm({onSubmit}) {
  const {id} = useParams()
  const client = useClient()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const CohortSchema = Yup.object().shape({
    name: Yup.string().required('Cohort Name is required'),
    description: Yup.string(),
  })
  const [ritchText, setRitchText] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(CohortSchema),
    defaultValues: {name: '', description: ''},
  })

  const {
    isLoading: fetchLoading,
    error: getOneError,
    data: cohort,
  } = useQuery({
    queryKey: 'cohort',
    queryFn: () =>
      client(`cohort/getCohortById?cohort_id=${id}`).then(data => data.data[0]),
    enabled: id !== undefined,
  })

  useEffect(() => {
    if (cohort && id !== undefined) {
      setRitchText(cohort.description)
      reset(cohort)
    }
  }, [cohort])

  const {mutate, isError, error, isLoading} = useMutation(
    data =>
      client(id ? 'cohort/update' : `cohort/create`, {
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
    let {name, description} = data
    mutate({
      name,
      description,
      visible: 1,
      is_system: true,
      cohort_id: id ? id : undefined,
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
          label="cohort_name"
          name="name"
          control={control}
          errors={errors}
        />

        <RichText
          label="Description"
          name="description"
          width="100%"
          editValue={ritchText}
          InputChange={(name, value) => setValue('description', value)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{my: 2}}
      >
        <LoadingButton
          onClick={() => navigate('/dashboard/cohorts')}
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
            <FormattedMessage id="update_cohort" />
          ) : (
            <FormattedMessage id="save" />
          )}
        </LoadingButton>
      </Stack>
    </form>
  )
}
